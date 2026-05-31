import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tac-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <div class="not-found__container">
        <div class="not-found__glow"></div>
        <h1 class="not-found__code">404</h1>
        <div class="not-found__laser-line"></div>
        <h2 class="not-found__title">Page Not Found</h2>
        <p class="not-found__text">
          The page you're looking for has been laser-cut from existence.
          Let's get you back on track.
        </p>
        <a routerLink="/" class="not-found__btn">
          <span>Back to Home</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  `,
  styles: [`
    .not-found {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-primary);
      position: relative;
      overflow: hidden;
    }

    .not-found__container {
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .not-found__glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, hsla(25, 100%, 55%, 0.15) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }

    .not-found__code {
      font-family: var(--font-heading);
      font-size: clamp(8rem, 20vw, 14rem);
      font-weight: 800;
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin: 0;
      position: relative;
    }

    .not-found__laser-line {
      height: 2px;
      background: var(--accent-gradient);
      margin: 1.5rem auto;
      width: 120px;
      box-shadow: 0 0 20px hsla(25, 100%, 55%, 0.5), 0 0 40px hsla(25, 100%, 55%, 0.3);
      animation: laserPulse 2s ease-in-out infinite;
    }

    .not-found__title {
      font-family: var(--font-heading);
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      color: var(--text-primary);
      margin: 0 0 1rem;
      font-weight: 600;
    }

    .not-found__text {
      font-family: var(--font-body);
      font-size: 1.125rem;
      color: var(--text-secondary);
      max-width: 450px;
      margin: 0 auto 2.5rem;
      line-height: 1.7;
    }

    .not-found__btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 2rem;
      background: var(--accent-gradient);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-family: var(--font-body);
      font-weight: 600;
      font-size: 1rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px hsla(25, 100%, 55%, 0.4);
      }
    }

    @keyframes laserPulse {
      0%, 100% { opacity: 1; width: 120px; }
      50% { opacity: 0.6; width: 160px; }
    }
  `],
})
export class NotFoundComponent {}
