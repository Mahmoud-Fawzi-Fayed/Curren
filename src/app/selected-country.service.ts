// selected-country.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Currency } from './Currency';

@Injectable({
  providedIn: 'root'
})
export class SelectedCountryService {
  private selectedCountrySubject: BehaviorSubject<Currency | undefined> = new BehaviorSubject<Currency | undefined>(undefined);
  private selectedCurrenciesSubject: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([]);

  setSelectedCountry(country: Currency) {
    this.selectedCountrySubject.next(country);
  }

  getSelectedCountry() {
    return this.selectedCountrySubject.asObservable();
  }

  setSelectedCurrencies(currencies: Currency[]) {
    this.selectedCurrenciesSubject.next(currencies);
  }

  getSelectedCurrencies() {
    return this.selectedCurrenciesSubject.asObservable();
  }
}

