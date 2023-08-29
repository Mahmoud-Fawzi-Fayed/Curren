// popup-card.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Currency } from 'src/app/Currency';
import { CurrencyServiceComponent } from 'src/app/currency-service/currency-service.component';
import { SelectedCountryService } from 'src/app/selected-country.service';


@Component({
  selector: 'popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.scss']
})
export class PopupCardComponent implements OnInit {
  @ViewChild('myInput') myInput: any;

  public currencyList: Currency[] = [];

  constructor(
    private currencyService: CurrencyServiceComponent,
    private selectedCountryService: SelectedCountryService,
  ) {}

  

  selectCountry(currency: Currency) {
    this.selectedCountryService.setSelectedCountry(currency);
  }

  ngOnInit(): void {
    this.populateCurrencyList();
    this.loadSelectedCurrencies();
  }

  populateCurrencyList() {
    this.currencyService.getCurrenciesPromise().then((currencies: Currency[]) => {
      this.currencyList = currencies;
    }).catch((error) => {
      console.error('Error fetching currencies:', error);
    });
  }

  isCurrencySelected(currency: Currency): boolean {
    const selectedCurrencies = this.getSelectedCurrencies();
    return selectedCurrencies.some((c: Currency) => c.name === currency.name);
  }


  onCheckboxChange(selectedCurrency: Currency) {
    const selectedCurrencies = this.getSelectedCurrencies();

    const currencyExists = selectedCurrencies.some((c: Currency) => c.name === selectedCurrency.name);

    if (currencyExists) {
        const updatedCurrencies = selectedCurrencies.filter((c: Currency) => c.name !== selectedCurrency.name);
        localStorage.setItem('selectedCurrencies', JSON.stringify(updatedCurrencies));
    } else {
        selectedCurrencies.push(selectedCurrency);
        localStorage.setItem('selectedCurrencies', JSON.stringify(selectedCurrencies));
    }

    // Emit an event to indicate the change
    this.selectedCountryService.setSelectedCurrencies(selectedCurrencies);
}


  getSelectedCurrencies(): Currency[] {
    const storedValue = localStorage.getItem('selectedCurrencies');
    return storedValue ? JSON.parse(storedValue) : [];
}

loadSelectedCurrencies() {
    this.currencyList.forEach((currency: Currency) => {
        if (this.isCurrencySelected(currency)) {
            this.onCheckboxChange(currency);
        }
    });
  }
  
}
