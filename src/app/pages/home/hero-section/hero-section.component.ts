import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PreloaderService } from '../../../core/services/preloader.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
// @ts-ignore
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

@Component({
  selector: 'tac-hero-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private platformId = inject(PLATFORM_ID);
  private preloader = inject(PreloaderService);
  
  // Three.js Core
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId: number = 0;

  // Scene Objects
  private metalSheet!: THREE.Mesh;
  private laserLight!: THREE.PointLight;
  private laserBeam!: THREE.Mesh;
  private cutTrail!: THREE.Line;
  
  // Path & Animation Data
  private cutPath!: THREE.CatmullRomCurve3;
  private pathProgress: number = 0;
  private trailVertices: Float32Array = new Float32Array(5000 * 3); // Max 5000 points
  private currentTrailCount: number = 0;
  private isPathReady = false;

  // Sparks System
  private sparks!: THREE.Points;
  private sparkVelocities: THREE.Vector3[] = [];
  private sparkLifetimes: number[] = [];
  private readonly MAX_SPARKS = 800;
  private sparkIndex = 0;

  // Interaction
  private mouse = new THREE.Vector2();
  private targetMouse = new THREE.Vector2();
  private baseCameraZ = 25;
  private baseCameraY = 25;

  constructor() {
    this.preloader.registerAsset();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      this.initThreeJs();
      this.setupGsapAnimations();
    }
  }

  private initThreeJs(): void {
    const canvas = this.canvasRef.nativeElement;
    
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0c10, 0.025); // Colorful dark fog
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 25, 30);
    this.camera.lookAt(0, 0, 0);
    
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    
    // Lighting (More colorful ambient environment)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(ambientLight);
    
    const blueLight = new THREE.DirectionalLight(0x0088ff, 2);
    blueLight.position.set(-20, 20, -10);
    this.scene.add(blueLight);

    const purpleLight = new THREE.DirectionalLight(0x8a2be2, 2);
    purpleLight.position.set(20, 10, 10);
    this.scene.add(purpleLight);

    // 1. The Metal Sheet - Made massive (300x300) so edges are never visible when rotated
    const sheetGeo = new THREE.PlaneGeometry(300, 300, 64, 64);
    const sheetMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.5,
      metalness: 0.9,
    });
    this.metalSheet = new THREE.Mesh(sheetGeo, sheetMat);
    this.metalSheet.rotation.x = -Math.PI / 2; // Lay flat
    this.scene.add(this.metalSheet);

    // Add a glowing grid helper for a cyberpunk/colorful industrial look
    const grid = new THREE.GridHelper(300, 150, 0x00d2ff, 0x112233);
    grid.position.y = 0.01;
    grid.material.transparent = true;
    grid.material.opacity = 0.3;
    this.scene.add(grid);

    // 2. The Laser Beam - Increased intensity for brightness
    this.laserLight = new THREE.PointLight(0xffbb00, 1500, 40);
    this.scene.add(this.laserLight);

    const beamGeo = new THREE.CylinderGeometry(0.1, 0.1, 20, 8);
    const beamMat = new THREE.MeshBasicMaterial({ 
      color: 0xffaa00, 
      transparent: true, 
      opacity: 0.9,
      blending: THREE.AdditiveBlending 
    });
    this.laserBeam = new THREE.Mesh(beamGeo, beamMat);
    this.scene.add(this.laserBeam);

    // 3. The Cut Trail - Increased brightness and linewidth
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(this.trailVertices, 3));
    trailGeo.setDrawRange(0, 0);
    const trailMat = new THREE.LineBasicMaterial({ 
      color: 0xff4400, 
      linewidth: 6, 
      transparent: true, 
      opacity: 1,
      blending: THREE.AdditiveBlending
    });
    this.cutTrail = new THREE.Line(trailGeo, trailMat);
    this.scene.add(this.cutTrail);

    // 4. Sparks Particle System
    const sparksGeo = new THREE.BufferGeometry();
    const sparksPositions = new Float32Array(this.MAX_SPARKS * 3);
    for(let i=0; i<this.MAX_SPARKS; i++) {
      this.sparkVelocities.push(new THREE.Vector3());
      this.sparkLifetimes.push(0);
      sparksPositions[i*3] = 9999;
    }
    sparksGeo.setAttribute('position', new THREE.BufferAttribute(sparksPositions, 3));
    
    const sparksMat = new THREE.PointsMaterial({
      size: 0.2,
      color: 0xff8800,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 1
    });
    this.sparks = new THREE.Points(sparksGeo, sparksMat);
    this.scene.add(this.sparks);

    // 5. Load Font and create path
    const loader = new FontLoader();
    loader.load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', (font: any) => {
      // We generate shapes for the words
      const shapes = font.generateShapes('TAC LASER', 8);
      const allPoints: THREE.Vector3[] = [];
      
      shapes.forEach((shape: any) => {
        const points = shape.getPoints(3); // lower detail for faster cutting
        points.forEach((p: any) => {
          allPoints.push(new THREE.Vector3(p.x, 0.05, -p.y));
        });
        
        if (shape.holes) {
          shape.holes.forEach((hole: any) => {
            const holePoints = hole.getPoints(3);
            holePoints.forEach((p: any) => {
              allPoints.push(new THREE.Vector3(p.x, 0.05, -p.y));
            });
          });
        }
      });

      // Center the path, but optionally shift it if needed
      const box = new THREE.Box3().setFromPoints(allPoints);
      const center = box.getCenter(new THREE.Vector3());
      allPoints.forEach(p => {
        p.sub(center);
        p.y = 0.05;
      });

      this.cutPath = new THREE.CatmullRomCurve3(allPoints, false);
      this.isPathReady = true;
      this.preloader.markAssetLoaded();
      this.animate(); // Start animation loop once path is ready
    });

    // Event Listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
    
    // Setup initial mobile layout
    this.onWindowResize();
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    
    if (!this.isPathReady) return;

    // Smooth camera parallax
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;
    
    this.camera.position.x = this.mouse.x * 10;
    this.camera.position.z = this.baseCameraZ + this.mouse.y * 10;
    this.camera.position.y = this.baseCameraY;
    this.camera.lookAt(0, 0, 0);

    // Update Laser Position
    this.pathProgress += 0.001; // Cutting speed
    if (this.pathProgress > 1) {
      this.pathProgress = 0;
      this.currentTrailCount = 0;
      this.cutTrail.geometry.setDrawRange(0, 0);
    }

    const currentPos = this.cutPath.getPointAt(this.pathProgress);
    
    this.laserLight.position.copy(currentPos);
    this.laserLight.position.y = 1; 
    
    this.laserBeam.position.copy(currentPos);
    this.laserBeam.position.y = 10;

    // Update Trail
    if (this.currentTrailCount < 5000) {
      const positions = this.cutTrail.geometry.attributes['position'].array as Float32Array;
      positions[this.currentTrailCount * 3] = currentPos.x;
      positions[this.currentTrailCount * 3 + 1] = currentPos.y;
      positions[this.currentTrailCount * 3 + 2] = currentPos.z;
      this.currentTrailCount++;
      this.cutTrail.geometry.setDrawRange(0, this.currentTrailCount);
      this.cutTrail.geometry.attributes['position'].needsUpdate = true;
    }

    // Emit Sparks
    this.emitSparks(currentPos);
    this.updateSparks();
    
    this.renderer.render(this.scene, this.camera);
  }

  private emitSparks(origin: THREE.Vector3) {
    const emitCount = 4;
    const positions = this.sparks.geometry.attributes['position'].array as Float32Array;
    
    for (let i = 0; i < emitCount; i++) {
      this.sparkIndex = (this.sparkIndex + 1) % this.MAX_SPARKS;
      
      positions[this.sparkIndex * 3] = origin.x;
      positions[this.sparkIndex * 3 + 1] = origin.y;
      positions[this.sparkIndex * 3 + 2] = origin.z;
      
      const vx = (Math.random() - 0.5) * 0.5;
      const vy = Math.random() * 0.5 + 0.3;
      const vz = (Math.random() - 0.5) * 0.5;
      
      this.sparkVelocities[this.sparkIndex].set(vx, vy, vz);
      this.sparkLifetimes[this.sparkIndex] = 1.0;
    }
  }

  private updateSparks() {
    const positions = this.sparks.geometry.attributes['position'].array as Float32Array;
    
    for (let i = 0; i < this.MAX_SPARKS; i++) {
      if (this.sparkLifetimes[i] > 0) {
        positions[i * 3] += this.sparkVelocities[i].x;
        positions[i * 3 + 1] += this.sparkVelocities[i].y;
        positions[i * 3 + 2] += this.sparkVelocities[i].z;
        
        this.sparkVelocities[i].y -= 0.015; // Gravity
        
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 0;
          this.sparkVelocities[i].y *= -0.5;
          this.sparkVelocities[i].x *= 0.8;
          this.sparkVelocities[i].z *= 0.8;
        }

        this.sparkLifetimes[i] -= 0.015;
        
        if (this.sparkLifetimes[i] <= 0) {
          positions[i * 3] = 9999;
        }
      }
    }
    this.sparks.geometry.attributes['position'].needsUpdate = true;
  }

  private onMouseMove(event: MouseEvent): void {
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private onTouchMove(event: TouchEvent): void {
    if (event.touches.length > 0) {
      this.targetMouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }

  private onWindowResize(): void {
    if (!this.camera || !this.renderer) return;
    
    const isMobile = window.innerWidth < 768;
    // Lowered Y and Z slightly to push the board up and fill the screen more tightly
    this.baseCameraY = isMobile ? 30 : 25;
    this.baseCameraZ = isMobile ? 40 : 25;
    
    if (this.scene) {
      // Rotate the scene diagonally on mobile so it fits the portrait aspect ratio beautifully
      this.scene.rotation.y = isMobile ? Math.PI / 4 : 0;
      // Shift the scene slightly back/up to center the text better on mobile
      this.scene.position.set(isMobile ? -2 : 0, 0, isMobile ? -5 : 0);
    }

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private setupGsapAnimations(): void {
    gsap.from('.hero__subtitle', {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 1
    });
    
    gsap.from('.hero__cta', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.5)',
      delay: 1.2
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onWindowResize.bind(this));
      window.removeEventListener('mousemove', this.onMouseMove.bind(this));
      window.removeEventListener('touchmove', this.onTouchMove.bind(this));
      cancelAnimationFrame(this.animationId);
      
      if (this.renderer) {
        this.renderer.dispose();
      }
    }
  }
}
