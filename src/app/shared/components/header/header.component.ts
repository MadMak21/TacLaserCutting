import {
  Component,
  signal,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'tac-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  navItems = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Services', path: '/services', exact: false },
    { label: 'Portfolio', path: '/portfolio', exact: false },
    { label: 'Industries', path: '/industries', exact: false },
    { label: 'About', path: '/about', exact: false },
    { label: 'Resources', path: '/resources', exact: false },
    { label: 'Contact', path: '/contact', exact: false },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);

    // Update progress bar
    if (this.progressBar) {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      this.progressBar.nativeElement.style.width = `${progress}%`;
    }
  }

  ngAfterViewInit(): void {
    this.onScroll();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
    document.body.style.overflow = this.isMobileMenuOpen() ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }
}
