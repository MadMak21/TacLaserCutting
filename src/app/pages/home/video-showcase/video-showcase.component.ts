import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PreloaderService } from '../../../core/services/preloader.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'tac-video-showcase',
  standalone: true,
  templateUrl: './video-showcase.component.html',
  styleUrl: './video-showcase.component.scss'
})
export class VideoShowcaseComponent implements AfterViewInit {
  features = [
    { label: 'Unmatched Speed', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Micron Precision', icon: 'M5 12h14M12 5v14M12 5l-7 7M12 5l7 7' },
    { label: 'Superior Quality', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' }
  ];
  
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  
  private platformId = inject(PLATFORM_ID);
  private preloader = inject(PreloaderService);

  constructor() {
    this.preloader.registerAsset();
  }

  onVideoLoaded() {
    this.preloader.markAssetLoaded();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }
}
