import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { WhatsappFabComponent } from './shared/components/whatsapp-fab/whatsapp-fab.component';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';

@Component({
  selector: 'tac-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsappFabComponent, PreloaderComponent],
  template: `
    <tac-preloader />
    <tac-header />
    <main class="main-content">
      <router-outlet />
    </main>
    <tac-footer />
    <tac-whatsapp-fab />
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
    }
  `],
})
export class App {}
