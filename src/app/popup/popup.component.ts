import { Component, OnInit } from '@angular/core';
import { CurrencyServiceComponent } from '../currency-service/currency-service.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public currencyList = [];

  constructor(
    private currencyService: CurrencyServiceComponent,
  ) {}

  ngOnInit(): void {
    this.getCurrencyList();
  }

  getCurrencyList() {
    this.currencyService.getCurrenciesPromise()
      .then((currencies) => {
        this.currencyList = currencies;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
