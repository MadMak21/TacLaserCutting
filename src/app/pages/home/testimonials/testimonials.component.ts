import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'tac-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private autoRotateInterval: any;
  
  currentIndex = 0;
  
  testimonials = [
    {
      quote: "TAC Laser Cutting delivered exceptional precision on our architectural panels. Their attention to detail is unmatched.",
      name: "Rajesh Patel",
      company: "Patel Construction",
      rating: 5
    },
    {
      quote: "Fast turnaround and consistent quality. They've been our go-to for all metal cutting needs.",
      name: "Priya Sharma",
      company: "Design Studios",
      rating: 5
    },
    {
      quote: "From prototype to production, their team understood exactly what we needed. Highly recommended!",
      name: "Amit Desai",
      company: "AutoTech Industries",
      rating: 5
    }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoRotate();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoRotate();
  }

  startAutoRotate(): void {
    this.autoRotateInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    }, 5000);
  }

  stopAutoRotate(): void {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }

  setIndex(index: number): void {
    this.currentIndex = index;
    this.stopAutoRotate();
    this.startAutoRotate(); // restart timer
  }
}
