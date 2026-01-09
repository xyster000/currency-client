
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CurrencyService } from '../../services/currency.service';
import { ConverterFormComponent } from '../converter-form/converter-form.component';
import { HistoryListComponent } from '../history-list/history-list.component';
import { Router } from '@angular/router';
import { AuthState } from '../../../auth/services/auth.state';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-currency-converter',
  imports: [CommonModule, MatCardModule, ConverterFormComponent,
    HistoryListComponent, MatIconModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyComponent {

  history: any[] = [];
  private api = inject(CurrencyService);
  constructor(private router: Router, private authState: AuthState) { }
  ngOnInit() {
    console.log('inside convert')
    this.load();
    this.api.historyUpdates$.subscribe(() => {
      this.load();
    });
  }

  load() {
    this.api.getHistory().subscribe(h => {
      this.history = h
      console.log(this.history)
    }

    );

  }
  logout() {
    this.authState.clear();
    localStorage.removeItem('accessToken');
    this.router.navigate(['/auth/login']);
  }
}
