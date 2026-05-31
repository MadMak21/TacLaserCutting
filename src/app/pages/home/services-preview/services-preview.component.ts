import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'tac-services-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services-preview.component.html',
  styleUrl: './services-preview.component.scss'
})
export class ServicesPreviewComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('serviceCard') cards!: QueryList<ElementRef>;
  private platformId = inject(PLATFORM_ID);
  
  services = [
    {
      title: 'Fiber Laser Cutting',
      description: 'Precision cutting for metals up to 25mm thick including steel, aluminum, and brass.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'CO2 Laser Cutting',
      description: 'Perfect for acrylics, wood, fabric & non-metals with smooth, flame-polished edges.',
      icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Laser Engraving',
      description: 'Detailed marking and branding on any surface for serial numbers or decorative patterns.',
      icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'CNC Bending',
      description: 'Precise metal forming and shaping to create complex 3D parts from flat laser-cut profiles.',
      icon: 'M4 4v16h16M4 20l8-8M12 12l8 8',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Welding & Assembly',
      description: 'Complete fabrication solutions combining TIG/MIG welding and mechanical assembly.',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
    },
    {
      title: 'Finishing & Coating',
      description: 'Professional surface treatments including powder coating, anodizing, and polishing.',
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 3h4'
    }
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      
      const cardsArray = this.cards.map(c => c.nativeElement);
      
      gsap.fromTo(
        cardsArray,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services',
            start: 'top 80%',
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }
}
