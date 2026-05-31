import { Component, ElementRef, ViewChild, AfterViewInit, effect, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PreloaderService } from '../../../core/services/preloader.service';
import gsap from 'gsap';

@Component({
  selector: 'tac-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss'
})
export class PreloaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('loaderContainer') loaderContainer!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;
  @ViewChild('progressText') progressText!: ElementRef;
  
  preloaderService = inject(PreloaderService);
  private platformId = inject(PLATFORM_ID);
  private tl: gsap.core.Timeline | undefined;
  private fallbackTimeout: any;

  constructor() {
    effect(() => {
      if (this.preloaderService.isReady()) {
        this.hideLoader();
      } else if (isPlatformBrowser(this.platformId)) {
        // Update progress bar width and text smoothly
        const progress = this.preloaderService.progress();
        if (this.progressBar) {
          gsap.to(this.progressBar.nativeElement, { width: `${progress}%`, duration: 0.3 });
        }
        if (this.progressText) {
          this.progressText.nativeElement.innerText = `${progress}%`;
        }
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Setup initial glowing animation for the laser dot
      this.tl = gsap.timeline({ repeat: -1, yoyo: true });
      this.tl.to('.laser-dot', {
        boxShadow: '0 0 20px 5px hsla(25, 100%, 55%, 0.8)',
        duration: 0.8,
        ease: 'power2.inOut'
      });

      // Fallback: If assets take too long (e.g. 8 seconds), force ready
      this.fallbackTimeout = setTimeout(() => {
        if (!this.preloaderService.isReady()) {
          console.warn('Preloader timeout. Forcing ready state.');
          this.preloaderService.forceReady();
        }
      }, 8000);
    }
  }

  hideLoader() {
    if (isPlatformBrowser(this.platformId) && this.loaderContainer) {
      gsap.to(this.loaderContainer.nativeElement, {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          this.loaderContainer.nativeElement.style.display = 'none';
          if (this.tl) this.tl.kill();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.fallbackTimeout) clearTimeout(this.fallbackTimeout);
    if (this.tl) this.tl.kill();
  }
}
