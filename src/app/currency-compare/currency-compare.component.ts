import { Component } from '@angular/core';
import { Currency } from '../Currency';
import { CurrencyServiceComponent } from '../currency-service/currency-service.component';

@Component({
  selector: 'app-currency-compare',
  templateUrl: './currency-compare.component.html',
  styleUrls: ['./currency-compare.component.scss', '../../styles/default.scss'],
})
export class CurrencyCompareComponent {
  currencies: Currency[] = [];
  selectedFromCurrency: string = '';

  selectedFirstTargetCurrency: string = '';
  selectedSecondTargetCurrency: string = '';
  amount: number = 1;

  convertedAmountFirstTarget: number = 0;
  convertedAmountSecondTarget: number = 0;

  constructor(private currencyService: CurrencyServiceComponent) {
    this.currencies = this.currencyService.getCurrencies();
  }

  selectFrom = (selectedFromCurrency: Currency): void => {
    this.selectedFromCurrency = selectedFromCurrency.name; // Store the selected currency's name
  };

  select_to_one = (selectedFirstTargetCurrency: Currency): void => {
    this.selectedFirstTargetCurrency = selectedFirstTargetCurrency.name; // Store the selected currency's name
  };

  select_to_two = (selectedSecondTargetCurrency: Currency): void => {
    this.selectedSecondTargetCurrency = selectedSecondTargetCurrency.name; // Store the selected currency's name
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
      this.convertedAmountFirstTarget =
        (this.amount * firstTargetCurrency.rate) / fromCurrency.rate;
      this.convertedAmountSecondTarget =
        (this.amount * secondTargetCurrency.rate) / fromCurrency.rate;
    }
    
  }
}
