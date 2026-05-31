import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'TAC Laser Cutting | Precision CNC Laser Cutting Solutions',
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services.component').then(
        (m) => m.ServicesComponent
      ),
    title: 'Our Services | TAC Laser Cutting',
  },
  {
    path: 'portfolio',
    loadComponent: () =>
      import('./pages/portfolio/portfolio.component').then(
        (m) => m.PortfolioComponent
      ),
    title: 'Portfolio | TAC Laser Cutting',
  },
  {
    path: 'industries',
    loadComponent: () =>
      import('./pages/industries/industries.component').then(
        (m) => m.IndustriesComponent
      ),
    title: 'Industries We Serve | TAC Laser Cutting',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About Us | TAC Laser Cutting',
  },
  {
    path: 'resources',
    loadComponent: () =>
      import('./pages/resources/resources.component').then(
        (m) => m.ResourcesComponent
      ),
    title: 'Resources & Guides | TAC Laser Cutting',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    title: 'Contact Us | TAC Laser Cutting',
  },
  {
    path: 'quote',
    loadComponent: () =>
      import('./pages/quote/quote.component').then((m) => m.QuoteComponent),
    title: 'Get a Free Quote | TAC Laser Cutting',
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.component').then((m) => m.AdminComponent),
    title: 'Admin Panel | TAC Laser Cutting',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: '404 - Page Not Found | TAC Laser Cutting',
  },
];
