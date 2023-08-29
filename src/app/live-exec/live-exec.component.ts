import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyServiceComponent } from '../currency-service/currency-service.component';
import { Currency } from '../Currency';
import { BehaviorSubject } from 'rxjs';
import { SharedServiceService } from '../shared-service.service';
import { SelectedCountryService } from '../selected-country.service';

@Component({
  selector: 'app-live-exec',
  templateUrl: './live-exec.component.html',
  styleUrls: ['./live-exec.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveExecComponent implements OnInit {
  savedCountries: Currency[] = [];


  public currencyList: Currency[] = [];
  public selectedFromCurrency: Currency | undefined;

  private _fromExchangeRate: number | undefined;
  private _fromExchangeRateSubject: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);

  constructor(private currencyService: CurrencyServiceComponent,
              private cdr: ChangeDetectorRef,
              private SharedServiceService: SharedServiceService,
              private selectedCountryService: SelectedCountryService) {}


              updateCurrencyList(selectedCurrencies: Currency[]) {
                this.currencyList = this.currencyList.filter(currency =>
                  selectedCurrencies.some(selectedCurrency => selectedCurrency.name === currency.name)
                );
            
                this.calculateExchangeRates();
                this.cdr.detectChanges();
              }
            
              ngOnInit(): void {
                this.selectedCountryService.getSelectedCurrencies().subscribe((currencies: Currency[]) => {
                  this.savedCountries = currencies;
                  console.log('Saved countries:', this.savedCountries);
                  this.updateCurrencyList(currencies);
                });

  

  this.selectedCountryService.getSelectedCountry().subscribe((selectedCountry) => {
    if (selectedCountry) {
      this.selectedFromCurrency = selectedCountry;
      this.fetchExchangeRate(selectedCountry);
    }
  });

  this.populateCurrencyList();
  const fromExchangeRateStr = localStorage.getItem('fromExchangeRate');
  this.SharedServiceService.fromExchangeRate$.subscribe((rate) => {
    this.fromExchangeRate = rate;
  });

  if (fromExchangeRateStr) {
    this.fromExchangeRate = parseFloat(fromExchangeRateStr);
  }
}



populateCurrencyList() {
  this.currencyService.getCurrenciesPromise().then((currenciess: Currency[]) => {
    this.currencyList = currenciess;
    console.log('Currency list:', this.currencyList);

    this.currencyList = this.currencyList.filter(currency =>
      this.savedCountries.some(savedCurrency => savedCurrency.name === currency.name)
    );

    this.calculateExchangeRates();
    this.cdr.detectChanges();
  }).catch((error) => {
    console.error('Error fetching currencies:', error);
  });
}


  calculateExchangeRates() {
    if (this.selectedFromCurrency && this._fromExchangeRate !== undefined) {
      this.savedCountries.forEach((currency: Currency) => {
        currency.calculatedRate = this._fromExchangeRate! / currency.rate;
      });
      this.cdr.markForCheck();
    }
  }

  get fromExchangeRate() {
    console.log("fromExchangeRate getter called with value:", this._fromExchangeRateSubject.value);
    return this._fromExchangeRateSubject.value;
  }
  

  set fromExchangeRate(value: number | undefined) {
    if (value !== this._fromExchangeRate) {
      this._fromExchangeRate = value;
      this._fromExchangeRateSubject.next(value);
      if (value !== undefined) {
        localStorage.setItem('fromExchangeRate', value.toString());
        this.calculateExchangeRates();
        this.cdr.detectChanges();
        console.log(this._fromExchangeRate)
      }
    }
  }

  
fetchExchangeRate(fromCurrency: Currency) {
  if (!fromCurrency) return;

  this.currencyService.getCurrenciesPromise().then(
    (data) => {
      const selectedCurrency = data.find((currency) => currency.name === fromCurrency.name);
      if (selectedCurrency) {
        this.fromExchangeRate = selectedCurrency.rate;
        localStorage.setItem('fromExchangeRate', this.fromExchangeRate!.toString());
        this.SharedServiceService.setFromExchangeRate(this.fromExchangeRate);
      }
    },
    () => {
    }
  );
}
}