import { Injectable, signal, computed } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_KEY = 'your-anon-key';

export interface SiteSettings {
  whatsappNumber: string;
  inquiryEmail: string;
  phoneDisplay: string;
  address: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  specs: {
    material: string;
    thickness: string;
    quantity: string;
    turnaround: string;
  };
  images: string[];
  testimonial?: string;
  clientName?: string;
  featured: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  company: string;
  rating: number;
}

export interface QuoteRequest {
  id: string;
  service: string;
  material: string;
  thickness: string;
  quantity: number;
  file?: string;
  requirements: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  contactMethod: string;
  urgency: string;
  status: 'new' | 'in-review' | 'quoted' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface AdminData {
  settings: SiteSettings;
  projects: Project[];
  testimonials: Testimonial[];
  quotes: QuoteRequest[];
  heroContent: {
    headline: string;
    subtitle: string;
  };
  stats: {
    years: number;
    projects: number;
    materials: number;
    industries: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private readonly SETTINGS_ID = 'tac-laser-admin';

  // State signals
  private _data = signal<AdminData>(this.getDefaultData());
  private _isLoading = signal(true);
  private _isAuthenticated = signal(false);

  // Public readonly signals
  readonly data = this._data.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  readonly settings = computed(() => this._data().settings);
  readonly projects = computed(() => this._data().projects);
  readonly featuredProjects = computed(() =>
    this._data().projects.filter((p) => p.featured)
  );
  readonly testimonials = computed(() => this._data().testimonials);
  readonly quotes = computed(() => this._data().quotes);
  readonly stats = computed(() => this._data().stats);
  readonly heroContent = computed(() => this._data().heroContent);

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    this.loadData();
  }

  private getDefaultData(): AdminData {
    return {
      settings: {
        whatsappNumber: '919876543210',
        inquiryEmail: 'info@taclasercutting.com',
        phoneDisplay: '+91 98765 43210',
        address: 'TAC Laser Cutting, Surat, Gujarat, India',
        socialLinks: {
          facebook: 'https://facebook.com/taclasercutting',
          instagram: 'https://instagram.com/taclasercutting',
          linkedin: 'https://linkedin.com/company/taclasercutting',
          youtube: 'https://youtube.com/@taclasercutting',
        },
      },
      projects: [
        {
          id: 'p1',
          title: 'Custom Steel Signage',
          category: 'Signage',
          description:
            'Precision laser-cut steel signage for a commercial plaza. Featuring intricate lettering and weather-resistant finishing.',
          specs: {
            material: 'Stainless Steel',
            thickness: '3mm',
            quantity: '12 pieces',
            turnaround: '5 days',
          },
          images: ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'],
          testimonial:
            'Exceptional quality and attention to detail. The signage looks stunning.',
          clientName: 'Rajesh Patel',
          featured: true,
          order: 1,
        },
        {
          id: 'p2',
          title: 'Decorative Wall Panels',
          category: 'Architecture',
          description:
            'Intricate geometric patterns laser-cut in aluminum panels for a luxury hotel lobby. Each panel is unique.',
          specs: {
            material: 'Aluminum',
            thickness: '2mm',
            quantity: '24 panels',
            turnaround: '10 days',
          },
          images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
          featured: true,
          order: 2,
        },
        {
          id: 'p3',
          title: 'Automotive Components',
          category: 'Industrial',
          description:
            'High-precision engine mounting brackets with ±0.1mm tolerance for an automotive manufacturer.',
          specs: {
            material: 'Mild Steel',
            thickness: '6mm',
            quantity: '500 pieces',
            turnaround: '7 days',
          },
          images: ['https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80'],
          featured: true,
          order: 3,
        },
        {
          id: 'p4',
          title: 'Metal Art Sculptures',
          category: 'Art',
          description:
            'Abstract metal sculptures for a modern art gallery. Intricate laser-cut designs assembled into 3D forms.',
          specs: {
            material: 'Corten Steel',
            thickness: '4mm',
            quantity: '6 sculptures',
            turnaround: '14 days',
          },
          images: [],
          featured: false,
          order: 4,
        },
        {
          id: 'p5',
          title: 'Electronic Enclosures',
          category: 'Industrial',
          description:
            'Precision-cut enclosures for IoT devices. Includes ventilation patterns and mounting holes.',
          specs: {
            material: 'Aluminum',
            thickness: '1.5mm',
            quantity: '200 units',
            turnaround: '4 days',
          },
          images: [],
          featured: false,
          order: 5,
        },
        {
          id: 'p6',
          title: 'Architectural Facades',
          category: 'Architecture',
          description:
            'Perforated facade panels for a modern commercial building. Designed for both aesthetics and sun shading.',
          specs: {
            material: 'Aluminum Composite',
            thickness: '3mm',
            quantity: '48 panels',
            turnaround: '21 days',
          },
          images: [],
          featured: false,
          order: 6,
        },
        {
          id: 'p7',
          title: 'Wedding Decorations',
          category: 'Custom',
          description:
            'Custom laser-cut wedding decorations including table numbers, name plates, and decorative screens.',
          specs: {
            material: 'Acrylic & Wood',
            thickness: '5mm',
            quantity: '150+ pieces',
            turnaround: '3 days',
          },
          images: [],
          featured: false,
          order: 7,
        },
        {
          id: 'p8',
          title: 'Restaurant Branding',
          category: 'Signage',
          description:
            'Complete branding package including illuminated signs, menu boards, and decorative elements.',
          specs: {
            material: 'Stainless Steel & Acrylic',
            thickness: '2-5mm',
            quantity: '20+ pieces',
            turnaround: '8 days',
          },
          images: [],
          featured: false,
          order: 8,
        },
      ],
      testimonials: [
        {
          id: 't1',
          quote:
            'TAC Laser Cutting delivered exceptional precision on our architectural panels. Their attention to detail is unmatched in the industry.',
          clientName: 'Rajesh Patel',
          company: 'Patel Construction',
          rating: 5,
        },
        {
          id: 't2',
          quote:
            'Fast turnaround and consistent quality. They have been our go-to partner for all metal cutting needs for the past 3 years.',
          clientName: 'Priya Sharma',
          company: 'Design Studios',
          rating: 5,
        },
        {
          id: 't3',
          quote:
            'From prototype to production, their team understood exactly what we needed. The precision and finish quality exceeded our expectations.',
          clientName: 'Amit Desai',
          company: 'AutoTech Industries',
          rating: 5,
        },
      ],
      quotes: [],
      heroContent: {
        headline: 'Precision Laser Cutting For Tomorrow\'s Industries',
        subtitle:
          'Custom CNC laser cutting, engraving & fabrication solutions. From prototype to production, we deliver precision that matters.',
      },
      stats: {
        years: 15,
        projects: 2000,
        materials: 50,
        industries: 7,
      },
    };
  }

  async loadData(): Promise<void> {
    this._isLoading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('settings')
        .select('data')
        .eq('id', this.SETTINGS_ID)
        .single();

      if (data?.data) {
        this._data.set({ ...this.getDefaultData(), ...data.data });
      }
    } catch (e) {
      // Use default data if Supabase is not configured
      console.log('Using default data (Supabase not configured)');
    }
    this._isLoading.set(false);
  }

  async saveData(): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('settings')
        .upsert({ id: this.SETTINGS_ID, data: this._data() });

      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Failed to save data:', e);
      return false;
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'TACadmin@2026') {
      this._isAuthenticated.set(true);
      localStorage.setItem('tac_admin_auth', 'true');
      return true;
    }
    return false;
  }

  checkAuth(): void {
    const auth = localStorage.getItem('tac_admin_auth');
    if (auth === 'true') {
      this._isAuthenticated.set(true);
    }
  }

  logout(): void {
    this._isAuthenticated.set(false);
    localStorage.removeItem('tac_admin_auth');
  }

  // Project CRUD
  updateProject(project: Project): void {
    this._data.update((d) => ({
      ...d,
      projects: d.projects.map((p) => (p.id === project.id ? project : p)),
    }));
    this.saveData();
  }

  addProject(project: Project): void {
    this._data.update((d) => ({
      ...d,
      projects: [...d.projects, project],
    }));
    this.saveData();
  }

  removeProject(id: string): void {
    this._data.update((d) => ({
      ...d,
      projects: d.projects.filter((p) => p.id !== id),
    }));
    this.saveData();
  }

  // Testimonial CRUD
  addTestimonial(testimonial: Testimonial): void {
    this._data.update((d) => ({
      ...d,
      testimonials: [...d.testimonials, testimonial],
    }));
    this.saveData();
  }

  removeTestimonial(id: string): void {
    this._data.update((d) => ({
      ...d,
      testimonials: d.testimonials.filter((t) => t.id !== id),
    }));
    this.saveData();
  }

  // Quote management
  addQuote(quote: QuoteRequest): void {
    this._data.update((d) => ({
      ...d,
      quotes: [...d.quotes, { ...quote, createdAt: new Date().toISOString() }],
    }));
    this.saveData();
  }

  updateQuoteStatus(
    id: string,
    status: QuoteRequest['status']
  ): void {
    this._data.update((d) => ({
      ...d,
      quotes: d.quotes.map((q) => (q.id === id ? { ...q, status } : q)),
    }));
    this.saveData();
  }

  // Settings update
  updateSettings(settings: Partial<SiteSettings>): void {
    this._data.update((d) => ({
      ...d,
      settings: { ...d.settings, ...settings },
    }));
    this.saveData();
  }

  // Stats update
  updateStats(stats: Partial<AdminData['stats']>): void {
    this._data.update((d) => ({
      ...d,
      stats: { ...d.stats, ...stats },
    }));
    this.saveData();
  }

  // Hero content update
  updateHeroContent(content: Partial<AdminData['heroContent']>): void {
    this._data.update((d) => ({
      ...d,
      heroContent: { ...d.heroContent, ...content },
    }));
    this.saveData();
  }
}
