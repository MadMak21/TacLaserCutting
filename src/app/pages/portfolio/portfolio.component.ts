import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'tac-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Our <span class="text-gradient">Portfolio</span></h1>
        <p class="page-subtitle">A showcase of our precision laser cutting and fabrication projects across various industries.</p>
      </div>

      <div class="container section">
        <!-- Categories Filter -->
        <div class="filter-tabs">
          <button class="filter-btn active">All</button>
          <button class="filter-btn">Architecture</button>
          <button class="filter-btn">Automotive</button>
          <button class="filter-btn">Interior Design</button>
          <button class="filter-btn">Manufacturing</button>
        </div>

        @if (supabase.isLoading()) {
          <div class="flex-center" style="height: 300px;">
            <div class="loading-spinner"></div>
          </div>
        } @else {
          <div class="grid-3 portfolio-grid">
            @for (project of supabase.projects(); track project.id) {
              <div class="portfolio-card glass-card glass-card--hover">
                <div class="portfolio-image" [style.background-image]="'url(' + (project.images[0] || 'assets/placeholder.jpg') + ')'">
                  <div class="portfolio-overlay">
                    <span class="badge">{{ project.category }}</span>
                  </div>
                </div>
                <div class="portfolio-content">
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.description }}</p>
                  @if (project.clientName) {
                    <p class="client-text">Client: {{ project.clientName }}</p>
                  }
                </div>
              </div>
            } @empty {
              <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p>No projects found. Check back soon!</p>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding-top: 100px;
      min-height: 100vh;
    }
    
    .page-header {
      text-align: center;
      padding: var(--space-16) var(--space-4);
      background: linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary));
      border-bottom: 1px solid var(--border-subtle);
    }

    .page-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      margin-bottom: var(--space-4);
    }

    .page-subtitle {
      color: var(--text-secondary);
      font-size: 1.25rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .filter-tabs {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--space-3);
      margin-bottom: var(--space-12);
    }

    .filter-btn {
      padding: var(--space-2) var(--space-6);
      background: transparent;
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      border-radius: var(--radius-full);
      cursor: pointer;
      font-weight: 500;
      transition: all var(--transition-fast);
      
      &:hover, &.active {
        background: hsla(25, 100%, 55%, 0.1);
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }

      &.active {
        background: var(--accent-gradient);
        color: white;
        border-color: transparent;
        box-shadow: 0 4px 15px hsla(25, 100%, 55%, 0.3);
      }
    }

    .portfolio-grid {
      margin-top: var(--space-8);
    }

    .portfolio-card {
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .portfolio-image {
      height: 250px;
      background-size: cover;
      background-position: center;
      background-color: var(--bg-tertiary);
      position: relative;
    }

    .portfolio-overlay {
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
    }

    .badge {
      background: hsla(220, 20%, 8%, 0.8);
      backdrop-filter: blur(4px);
      color: var(--text-primary);
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
      border: 1px solid var(--border-subtle);
    }

    .portfolio-content {
      padding: var(--space-6);
      flex-grow: 1;
      
      h3 { margin-bottom: var(--space-2); }
      p { color: var(--text-secondary); margin-bottom: var(--space-4); font-size: 0.9375rem; }
    }

    .client-text {
      font-size: 0.875rem !important;
      color: var(--accent-primary) !important;
      font-weight: 500;
      margin-bottom: 0 !important;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--border-subtle);
      border-top-color: var(--accent-primary);
      border-radius: 50%;
      animation: rotate360 1s linear infinite;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: var(--space-16);
      color: var(--text-secondary);
      background: var(--bg-secondary);
      border-radius: var(--radius-xl);
      border: 1px dashed var(--border-subtle);
      
      svg { margin-bottom: var(--space-4); opacity: 0.5; }
    }

    @keyframes rotate360 {
      to { transform: rotate(360deg); }
    }
  `]
})
export class PortfolioComponent implements OnInit {
  supabase = inject(SupabaseService);

  ngOnInit() {
    this.supabase.loadData();
  }
}
