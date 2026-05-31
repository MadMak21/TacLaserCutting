import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'tac-stats-section',
  standalone: true,
  templateUrl: './stats-section.component.html',
  styleUrl: './stats-section.component.scss'
})
export class StatsSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('statNumber') statElements!: QueryList<ElementRef>;
  
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;
  
  stats = [
    { label: 'Years Experience', target: 15, suffix: '+', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Projects Completed', target: 2000, suffix: '+', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Materials', target: 50, suffix: '+', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { label: 'Industries Served', target: 7, suffix: '', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.animateNumbers();
          this.observer?.disconnect();
        }
      }, { threshold: 0.5 });
      
      if (this.statElements.first) {
        this.observer.observe(this.statElements.first.nativeElement.closest('.stats'));
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animateNumbers(): void {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    this.statElements.forEach((el, index) => {
      let frame = 0;
      const target = this.stats[index].target;
      
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(target * progress);
        
        if (el.nativeElement) {
          el.nativeElement.innerText = currentCount;
        }
        
        if (frame === totalFrames) {
          clearInterval(counter);
          if (el.nativeElement) {
            el.nativeElement.innerText = target;
          }
        }
      }, frameDuration);
    });
  }
}
