import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tac-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Get a Quote', path: '/quote' },
  ];

  services = [
    'Fiber Laser Cutting',
    'CO2 Laser Cutting',
    'Laser Engraving',
    'CNC Bending',
    'Welding & Assembly',
    'Finishing & Coating',
  ];

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
