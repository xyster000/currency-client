import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CurrencyService } from '../../services/currency.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-history-list',
  imports: [CommonModule, MatCardModule, MatProgressSpinner],
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})

export class HistoryListComponent {
  private api = inject(CurrencyService);
  loading = false
  constructor() {
    this.api.isLoading$.subscribe(v => { (this.loading = v) });
  }
  @Input() history: any[] = [];
}
