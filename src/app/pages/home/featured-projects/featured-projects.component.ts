import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'tac-featured-projects',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss'
})
export class FeaturedProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('projectCard') cards!: QueryList<ElementRef>;
  private platformId = inject(PLATFORM_ID);

  projects = [
    {
      title: 'Industrial Signage',
      category: 'Architecture',
      description: 'Custom laser-cut steel signage for commercial buildings.',
      gradientClass: 'project-gradient-1'
    },
    {
      title: 'Decorative Panels',
      category: 'Interior Design',
      description: 'Intricate geometric patterns in aluminum.',
      gradientClass: 'project-gradient-2'
    },
    {
      title: 'Automotive Parts',
      category: 'Manufacturing',
      description: 'Precision engine components with ±0.1mm tolerance.',
      gradientClass: 'project-gradient-3'
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
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.featured-projects',
            start: 'top 75%',
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
