import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tac-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Contact <span class="text-gradient">Us</span></h1>
        <p class="page-subtitle">We're here to help with your laser cutting needs. Reach out to our team today.</p>
      </div>

      <div class="container section">
        <div class="contact-grid">
          <div class="contact-cards">
            <!-- Office Address -->
            <div class="glass-card contact-method">
              <div class="method-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div class="method-details">
                <h3>Our Facility</h3>
                <p>123 Industrial Estate, Phase 2<br>Surat, Gujarat 395002<br>India</p>
              </div>
            </div>

            <!-- Phone -->
            <div class="glass-card contact-method">
              <div class="method-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div class="method-details">
                <h3>Call Us</h3>
                <p>Sales: <a href="tel:+919876543210" class="text-gradient">+91 98765 43210</a></p>
                <p>Support: <a href="tel:+919876543211">+91 98765 43211</a></p>
              </div>
            </div>

            <!-- Hours -->
            <div class="glass-card contact-method">
              <div class="method-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div class="method-details">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <!-- Map Placeholder -->
          <div class="map-container glass-card">
            <div class="map-placeholder">
              <div class="map-marker">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>TAC Laser Cutting Facility</span>
              </div>
              <p>Google Maps Integration Here</p>
            </div>
          </div>
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
    
    .page-title { font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: var(--space-4); }
    .page-subtitle { color: var(--text-secondary); font-size: 1.25rem; max-width: 600px; margin: 0 auto; }
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-8);
      
      @media (min-width: 1024px) {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .contact-cards {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }
    
    .contact-method {
      display: flex;
      align-items: flex-start;
      gap: var(--space-6);
      padding: var(--space-6);
      
      h3 { margin-bottom: var(--space-2); font-size: 1.25rem; }
      p { color: var(--text-secondary); margin: 0 0 var(--space-1); line-height: 1.6; }
      a { color: inherit; text-decoration: none; transition: color var(--transition-fast); }
      a:hover { color: var(--accent-primary); }
    }
    
    .method-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-full);
      background: hsla(25, 100%, 55%, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-primary);
      flex-shrink: 0;
      
      svg { width: 24px; height: 24px; }
    }
    
    .map-container {
      padding: var(--space-4);
      height: 100%;
      min-height: 400px;
    }
    
    .map-placeholder {
      width: 100%;
      height: 100%;
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      background-image: radial-gradient(var(--border-subtle) 1px, transparent 1px);
      background-size: 20px 20px;
    }
    
    .map-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
      
      svg { width: 48px; height: 48px; }
      span { font-weight: 600; color: var(--text-primary); }
    }
  `]
})
export class ContactComponent {}
