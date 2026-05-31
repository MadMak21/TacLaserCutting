import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PlaceholderPageComponent } from '../../shared/components/placeholder-page/placeholder-page.component';

@Component({
  selector: 'tac-industries',
  standalone: true,
  imports: [PlaceholderPageComponent],
  template: `<tac-placeholder-page #page></tac-placeholder-page>`
})
export class IndustriesComponent implements AfterViewInit {
  @ViewChild('page') page!: PlaceholderPageComponent;
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.page.title = 'Industries';
      this.page.subtitle = 'Discover how we serve various sectors with precision cutting.';
    });
  }
}
