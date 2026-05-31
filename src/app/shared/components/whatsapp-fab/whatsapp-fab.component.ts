import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../../core/services/supabase.service';

@Component({
  selector: 'tac-whatsapp-fab',
  standalone: true,
  templateUrl: './whatsapp-fab.component.html',
  styleUrl: './whatsapp-fab.component.scss'
})
export class WhatsappFabComponent {
  private supabase = inject(SupabaseService);
  
  get whatsappNumber() {
    return this.supabase.settings().whatsappNumber;
  }
}
