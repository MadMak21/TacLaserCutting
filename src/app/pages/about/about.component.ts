import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PlaceholderPageComponent } from '../../shared/components/placeholder-page/placeholder-page.component';

@Component({
  selector: 'tac-about',
  standalone: true,
  imports: [PlaceholderPageComponent],
  template: `<tac-placeholder-page #page></tac-placeholder-page>`
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('page') page!: PlaceholderPageComponent;
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.page.title = 'About TAC Laser Cutting';
      this.page.subtitle = 'Learn about our history, mission, and the team driving precision forward.';
    });
  }
}
