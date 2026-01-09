import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';
import { BehaviorSubject, finalize, Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
    //private api = 'http://localhost:3000/currency';
    private api = 'https://currency-server-production.up.railway.app/currency'
    private historyUpdated$ = new Subject<void>();
    private loading$ = new BehaviorSubject<boolean>(false);
    readonly isLoading$ = this.loading$.asObservable();
    historyUpdates$ = this.historyUpdated$.asObservable();
    constructor(private http: HttpClient) { }

    notifyHistoryUpdate() {
        this.historyUpdated$.next();
    }
    getCurrencies() {
        return this.http.get<any>(
            `${this.api}/currencies`,
        );
    }


    getRates(date: string, base = 'USD') {
        this.loading$.next(true);
        console.log("date=====", date)
        const params: any = { base };

        if (date) {
            params.date = date;
        }

        return this.http.get<any>(`${this.api}/rates`, { params }).pipe(
            finalize(() => this.loading$.next(false))
        );
    }


    saveConversion(data: {
        fromCurrency: string;
        toCurrency: string;
        fromAmount: number;
        toAmount: number;
    }) {
        console.log('save===============')
        this.loading$.next(true);

        return this.http.post(
            `${this.api}/save`,
            data,
        ).pipe(
            tap(() => this.notifyHistoryUpdate()),
            finalize(() => this.loading$.next(false))
        );
    }


    getHistory() {
        this.loading$.next(true);
        return this.http.get<any[]>(
            `${this.api}/history`,
        ).pipe(
            finalize(() => this.loading$.next(false))
        );
    }
}
