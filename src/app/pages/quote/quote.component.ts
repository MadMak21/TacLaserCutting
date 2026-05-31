import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'tac-quote',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Get a <span class="text-gradient">Free Quote</span></h1>
        <p class="page-subtitle">Tell us about your project requirements and we'll get back to you within 24 hours.</p>
      </div>

      <div class="container section">
        <div class="quote-grid">
          <!-- Info Column -->
          <div class="quote-info glass-card">
            <h3>Why Choose TAC?</h3>
            <ul class="benefit-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span>State-of-the-art Fiber & CO2 Lasers</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span>Precision tolerances up to ±0.1mm</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span>Rapid turnaround times</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span>Competitive pricing</span>
              </li>
            </ul>
            
            <div class="contact-card mt-8">
              <h4>Need immediate assistance?</h4>
              <p>Call our sales team directly</p>
              <a href="tel:+919876543210" class="text-gradient phone-link">+91 98765 43210</a>
            </div>
          </div>
          
          <!-- Form Column -->
          <div class="quote-form-container glass-card">
            @if (submitted) {
              <div class="success-message text-center">
                <svg class="text-gradient" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h3>Quote Request Sent!</h3>
                <p>Thank you for reaching out. Our team will review your requirements and get back to you shortly.</p>
                <button class="btn-outline mt-4" (click)="resetForm()">Submit Another Request</button>
              </div>
            } @else {
              <form [formGroup]="quoteForm" (ngSubmit)="onSubmit()" class="quote-form">
                <div class="form-row grid-2">
                  <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" formControlName="name" class="glass-input" placeholder="John Doe">
                  </div>
                  <div class="form-group">
                    <label>Company (Optional)</label>
                    <input type="text" formControlName="company" class="glass-input" placeholder="Acme Corp">
                  </div>
                </div>
                
                <div class="form-row grid-2">
                  <div class="form-group">
                    <label>Email Address *</label>
                    <input type="email" formControlName="email" class="glass-input" placeholder="john@example.com">
                  </div>
                  <div class="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" formControlName="phone" class="glass-input" placeholder="+91 98765 43210">
                  </div>
                </div>
                
                <div class="form-group">
                  <label>Service Required *</label>
                  <select formControlName="service" class="glass-input custom-select">
                    <option value="" disabled selected>Select a service</option>
                    <option value="fiber">Fiber Laser Cutting (Metals)</option>
                    <option value="co2">CO2 Laser Cutting (Non-metals)</option>
                    <option value="engraving">Laser Engraving & Marking</option>
                    <option value="bending">CNC Bending</option>
                    <option value="welding">Welding & Assembly</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label>Project Details *</label>
                  <textarea formControlName="details" class="glass-input" rows="5" placeholder="Please describe your project, materials needed, thickness, quantity, and any other requirements..."></textarea>
                </div>
                
                <button type="submit" class="btn-primary w-full mt-4" [disabled]="quoteForm.invalid || isSubmitting">
                  @if (isSubmitting) {
                    <span class="loading-spinner-small"></span> Submitting...
                  } @else {
                    Submit Request
                  }
                </button>
              </form>
            }
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
    
    .quote-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-8);
      
      @media (min-width: 1024px) {
        grid-template-columns: 1fr 2fr;
      }
    }
    
    .quote-info, .quote-form-container {
      padding: var(--space-8);
    }
    
    .benefit-list {
      list-style: none;
      padding: 0;
      margin: var(--space-6) 0;
      
      li {
        display: flex;
        align-items: flex-start;
        gap: var(--space-3);
        margin-bottom: var(--space-4);
        color: var(--text-secondary);
        
        svg {
          width: 20px;
          height: 20px;
          color: var(--accent-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }
      }
    }
    
    .contact-card {
      background: hsla(220, 20%, 10%, 0.5);
      padding: var(--space-6);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-subtle);
      
      h4 { margin-bottom: var(--space-2); }
      p { color: var(--text-secondary); font-size: 0.875rem; margin-bottom: var(--space-2); }
      .phone-link { font-size: 1.5rem; font-weight: 700; text-decoration: none; }
    }
    
    .form-group {
      margin-bottom: var(--space-6);
      
      label {
        display: block;
        margin-bottom: var(--space-2);
        font-weight: 500;
        font-size: 0.9375rem;
      }
    }
    
    .custom-select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1em;
      
      option { background: var(--bg-primary); }
    }
    
    .w-full { width: 100%; }
    .mt-4 { margin-top: var(--space-4); }
    .mt-8 { margin-top: var(--space-8); }
    .text-center { text-align: center; }
    
    .success-message {
      padding: var(--space-8) 0;
      
      svg { margin-bottom: var(--space-6); }
      h3 { font-size: 2rem; margin-bottom: var(--space-4); }
      p { color: var(--text-secondary); margin-bottom: var(--space-8); }
    }
    
    .loading-spinner-small {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: rotate360 1s linear infinite;
    }
    
    @keyframes rotate360 { to { transform: rotate(360deg); } }
  `]
})
export class QuoteComponent {
  private fb = inject(FormBuilder);
  private supabase = inject(SupabaseService);
  
  submitted = false;
  isSubmitting = false;
  
  quoteForm = this.fb.group({
    name: ['', Validators.required],
    company: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    service: ['', Validators.required],
    details: ['', Validators.required]
  });

  async onSubmit() {
    if (this.quoteForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      try {
        await this.supabase.addQuote(this.quoteForm.value as any);
        this.submitted = true;
      } catch (e) {
        console.error('Error submitting quote', e);
        alert('Failed to submit quote. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.quoteForm.markAllAsTouched();
    }
  }
  
  resetForm() {
    this.quoteForm.reset({ service: '' });
    this.submitted = false;
  }
}
