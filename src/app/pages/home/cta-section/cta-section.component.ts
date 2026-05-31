import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'tac-cta-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cta-section.component.html',
  styleUrl: './cta-section.component.scss'
})
export class CtaSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ctaBox') ctaBox!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      
      gsap.fromTo(
        this.ctaBox.nativeElement,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta',
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
