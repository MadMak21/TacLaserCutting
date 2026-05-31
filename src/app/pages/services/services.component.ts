import { Component } from '@angular/core';
import { PlaceholderPageComponent } from '../../shared/components/placeholder-page/placeholder-page.component';

@Component({
  selector: 'tac-services',
  standalone: true,
  imports: [PlaceholderPageComponent],
  template: `<tac-placeholder-page></tac-placeholder-page>`
})
export class ServicesComponent {}
