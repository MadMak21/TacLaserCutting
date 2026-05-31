import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService, Project, Testimonial, QuoteRequest } from '../../core/services/supabase.service';

@Component({
  selector: 'tac-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private supabase = inject(SupabaseService);

  readonly isAuthenticated = this.supabase.isAuthenticated;
  readonly data = this.supabase.data;
  readonly projects = this.supabase.projects;
  readonly testimonials = this.supabase.testimonials;
  readonly quotes = this.supabase.quotes;
  readonly settings = this.supabase.settings;
  readonly stats = this.supabase.stats;

  activeTab = signal<string>('dashboard');
  loginUsername = signal('');
  loginPassword = signal('');
  loginError = signal('');
  saveMessage = signal('');

  // Edit states
  editingProject = signal<Project | null>(null);
  editingTestimonial = signal<Testimonial | null>(null);

  // Form models
  settingsForm = signal({
    whatsappNumber: '',
    inquiryEmail: '',
    phoneDisplay: '',
    address: '',
  });

  statsForm = signal({
    years: 0,
    projects: 0,
    materials: 0,
    industries: 0,
  });

  pendingQuotes = computed(
    () => this.quotes().filter((q) => q.status === 'new').length
  );

  constructor() {
    this.supabase.checkAuth();
  }

  onLogin(): void {
    const success = this.supabase.login(
      this.loginUsername(),
      this.loginPassword()
    );
    if (!success) {
      this.loginError.set('Invalid credentials');
    }
  }

  onLogout(): void {
    this.supabase.logout();
  }

  setTab(tab: string): void {
    this.activeTab.set(tab);
    if (tab === 'settings') {
      const s = this.settings();
      this.settingsForm.set({
        whatsappNumber: s.whatsappNumber,
        inquiryEmail: s.inquiryEmail,
        phoneDisplay: s.phoneDisplay,
        address: s.address,
      });
    }
    if (tab === 'stats') {
      this.statsForm.set({ ...this.stats() });
    }
  }

  saveSettings(): void {
    this.supabase.updateSettings(this.settingsForm());
    this.showSaveMessage();
  }

  saveStats(): void {
    this.supabase.updateStats(this.statsForm());
    this.showSaveMessage();
  }

  toggleProjectFeatured(project: Project): void {
    this.supabase.updateProject({ ...project, featured: !project.featured });
  }

  deleteProject(id: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.supabase.removeProject(id);
    }
  }

  deleteTestimonial(id: string): void {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.supabase.removeTestimonial(id);
    }
  }

  updateQuoteStatus(id: string, status: string): void {
    this.supabase.updateQuoteStatus(
      id,
      status as 'new' | 'in-review' | 'quoted' | 'accepted' | 'rejected'
    );
    this.showSaveMessage();
  }

  private showSaveMessage(): void {
    this.saveMessage.set('Changes saved successfully!');
    setTimeout(() => this.saveMessage.set(''), 3000);
  }
}
