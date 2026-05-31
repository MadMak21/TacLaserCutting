import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PlaceholderPageComponent } from '../../shared/components/placeholder-page/placeholder-page.component';

@Component({
  selector: 'tac-resources',
  standalone: true,
  imports: [PlaceholderPageComponent],
  template: `<tac-placeholder-page #page></tac-placeholder-page>`
})
export class ResourcesComponent implements AfterViewInit {
  @ViewChild('page') page!: PlaceholderPageComponent;
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.page.title = 'Resources & Guides';
      this.page.subtitle = 'Access technical specifications, material guides, and case studies.';
    });
  }
}
