import { Component, inject } from "@angular/core";
import { FormBuilder, NonNullableFormBuilder } from "@angular/forms";
import { CurrencyService } from "../../services/currency.service";
import { Currency } from "../../models/currency.model";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Subject } from 'rxjs';
import { debounceTime, skip } from 'rxjs/operators';
import { MatProgressSpinner, MatSpinner } from "@angular/material/progress-spinner";

@Component({
  standalone: true,
  selector: 'app-converter-form',
  imports: [CommonModule, MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatProgressSpinner,

  ],
  templateUrl: './converter-form.component.html',
  styleUrl: './converter-form.component.scss'
})
export class ConverterFormComponent {
  private fb = inject(NonNullableFormBuilder);
  private api = inject(CurrencyService);
  private save$ = new Subject<void>();
  currencies: Currency[] = [];
  rates: Record<string, number> = {};
  private updating = false;
  today = new Date();
  form = this.fb.group({
    date: new Date(),
    fromAmount: 0,
    fromCurrency: 'USD',
    toAmount: 0,
    toCurrency: 'EUR',
  });
  loading = false;
  constructor() {
    this.api.isLoading$.subscribe(v => { (this.loading = v) });

  }
  ngOnInit() {
    this.api.getCurrencies().subscribe(c => (this.currencies = c));
    this.loadRates();
    this.loading = false
    this.save$
      .pipe(debounceTime(800), skip(1))
      .subscribe(() => {
        this.api
          .saveConversion({
            ...this.form.getRawValue(),
          })
          .subscribe();
      });
    this.save$.next();
  }


  onFromAmountChange() {
    if (this.updating) return;
    this.updating = true;

    const { fromAmount, fromCurrency, toCurrency } =
      this.form.getRawValue();

    const result =
      fromAmount *
      (this.rates[toCurrency] / this.rates[fromCurrency]);

    this.form.patchValue(
      { toAmount: +result.toFixed(4) },
      { emitEvent: false },
    );

    this.updating = false;
    if (fromAmount > 0) {
      this.api.isLoading$.subscribe(v => { (this.loading = v) });


      this.save$.next();
    }
  }

  onToAmountChange() {
    if (this.updating) return;
    this.updating = true;

    const { toAmount, fromCurrency, toCurrency } =
      this.form.getRawValue();

    const result =
      toAmount *
      (this.rates[fromCurrency] / this.rates[toCurrency]);

    this.form.patchValue(
      { fromAmount: +result.toFixed(2) },
      { emitEvent: false },
    );

    this.updating = false;
    if (toAmount > 0) {
      console.log('ionsie to', toAmount)
      this.api.isLoading$.subscribe(v => { (this.loading = v) });

      this.save$.next();
    }
  }

  recalculateFrom() {
    this.onFromAmountChange();
  }
  private isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  loadRates() {
    const { date, fromCurrency } = this.form.getRawValue();

    const queryDate = this.isToday(date)
      ? ""
      : this.formatDate(date);
    this.api.getRates(queryDate, fromCurrency).subscribe(res => {
      this.rates = res;
      this.recalculateFrom();
    });
  }
  onDateChange() {
    this.loadRates();
  }


}
