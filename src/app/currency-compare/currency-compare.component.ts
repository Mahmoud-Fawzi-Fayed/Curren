import { Component } from '@angular/core';
import { Currency } from '../Currency';
import { CurrencyServiceComponent } from '../currency-service/currency-service.component';
import { Router } from '@angular/router';
import { AppStateService } from '../app-state-service.service';


@Component({
  selector: 'app-currency-compare',
  templateUrl: './currency-compare.component.html',
  styleUrls: ['./currency-compare.component.scss', '../../styles/default.scss'],
})
export class CurrencyCompareComponent {
  activeButton: 'Convert' | 'Compare' = 'Convert';
  currencies: Currency[] = [];
  selectedFromCurrency: string = '';

  selectedFirstTargetCurrency: string = '';
  selectedSecondTargetCurrency: string = '';
  amount: number = 1;

  convertedAmountFirstTarget: number = 0;
  convertedAmountSecondTarget: number = 0;

  constructor(private currencyService: CurrencyServiceComponent,
              private router: Router,
              public appStateService: AppStateService) {
    this.currencies = this.currencyService.getCurrencies();
  }

  setActiveButton(button: 'Convert' | 'Compare') {
    this.appStateService.setActiveMode(button);
  }

  navigateToConvert() {
    this.router.navigate(['//']);
  }
  

  selectFrom = (selectedFromCurrency: Currency): void => {
    this.selectedFromCurrency = selectedFromCurrency.name;
  };

  select_to_one = (selectedFirstTargetCurrency: Currency): void => {
    this.selectedFirstTargetCurrency = selectedFirstTargetCurrency.name;
  };

  select_to_two = (selectedSecondTargetCurrency: Currency): void => {
    this.selectedSecondTargetCurrency = selectedSecondTargetCurrency.name;
  };

  compareCurrencies(): void {

    const fromCurrency = this.currencies.find(
      (currency) => currency.name === this.selectedFromCurrency
    );

    const firstTargetCurrency = this.currencies.find(
      (currency) => currency.name === this.selectedFirstTargetCurrency
    );

    const secondTargetCurrency = this.currencies.find(
      (currency) => currency.name === this.selectedSecondTargetCurrency
    );

    if (fromCurrency && firstTargetCurrency && secondTargetCurrency) {
      this.convertedAmountFirstTarget = parseFloat(((this.amount * firstTargetCurrency.rate) / fromCurrency.rate).toFixed(2))  ;
      this.convertedAmountSecondTarget = parseFloat(((this.amount * secondTargetCurrency.rate) / fromCurrency.rate).toFixed(2))  ;
    }
    
  }
}
