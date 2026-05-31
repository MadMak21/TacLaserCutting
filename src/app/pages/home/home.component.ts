import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { StatsSectionComponent } from './stats-section/stats-section.component';
import { ServicesPreviewComponent } from './services-preview/services-preview.component';
import { VideoShowcaseComponent } from './video-showcase/video-showcase.component';
import { FeaturedProjectsComponent } from './featured-projects/featured-projects.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { CtaSectionComponent } from './cta-section/cta-section.component';

@Component({
  selector: 'tac-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    StatsSectionComponent,
    ServicesPreviewComponent,
    VideoShowcaseComponent,
    FeaturedProjectsComponent,
    TestimonialsComponent,
    CtaSectionComponent
  ],
  template: `
    <div class="home-page">
      <tac-hero-section />
      <tac-stats-section />
      <tac-services-preview />
      <tac-video-showcase />
      <tac-featured-projects />
      <tac-testimonials />
      <tac-cta-section />
    </div>
  `,
  styles: [`
    .home-page {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class HomeComponent {}
