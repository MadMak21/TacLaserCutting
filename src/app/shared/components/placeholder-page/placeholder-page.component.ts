import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tac-placeholder-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">{{ title }} <span class="text-gradient">Solutions</span></h1>
        <p class="page-subtitle">{{ subtitle }}</p>
      </div>

      <div class="container section flex-center">
        <div class="glass-card construction-card">
          <div class="construction-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
          </div>
          <h2>Under Construction</h2>
          <p>We're actively building out the detailed content for this section to provide you with the most extraordinary experience.</p>
          <a routerLink="/" class="btn-primary mt-6">Return Home</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding-top: 100px; min-height: 100vh; }
    
    .page-header {
      text-align: center;
      padding: var(--space-16) var(--space-4);
      background: linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary));
      border-bottom: 1px solid var(--border-subtle);
    }
    
    .page-title { font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: var(--space-4); text-transform: capitalize; }
    .page-subtitle { color: var(--text-secondary); font-size: 1.25rem; max-width: 600px; margin: 0 auto; }
    
    .construction-card {
      max-width: 500px;
      text-align: center;
      padding: var(--space-10);
      display: flex;
      flex-direction: column;
      align-items: center;
      
      h2 { margin: var(--space-6) 0 var(--space-3); }
      p { color: var(--text-secondary); line-height: 1.6; }
    }
    
    .construction-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: hsla(25, 100%, 55%, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-primary);
      
      svg { width: 40px; height: 40px; }
    }
    
    .mt-6 { margin-top: var(--space-6); }
  `]
})
export class PlaceholderPageComponent {
  title = 'Page';
  subtitle = 'Discover what makes TAC Laser Cutting the industry leader.';
}
