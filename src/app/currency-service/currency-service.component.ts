import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from 'src/app/Currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyServiceComponent {
  private currencies: Currency[] = [];
  private lastUpdate;

  constructor(private http: HttpClient) {}

  public getCurrencies() {
    return this.currencies;
  }

  public getLastUpdate() {
    return this.lastUpdate;
  }

  public getCurrenciesPromise() {
    return new Promise<any>((resolve, reject) => {
      if (this.currencies.length === 0) {
        this.http.get<any>('https://allcurrency-5081e-default-rtdb.firebaseio.com/allCurrency.json')
          .subscribe(
            (data) => {
              if (data && data.data) {
                this.currencies = data.data.map(item => {
                  return {
                    rate: 0, // Set the rate value based on your needs
                    full_name: item.currencyCode,
                    name: item.currencyCode,
                    flagUrl: item.flagUrl,
                  };
                });
                this.lastUpdate = new Date(); // Update lastUpdate based on your needs
                this.fetchExchangeRates(resolve, reject);
              } else {
                reject('Error fetching currency data');
              }
            },
            (error) => {
              reject(error);
            }
          );
      } else {
        resolve(this.currencies);
      }
    });
  }
  private fetchExchangeRates(resolve: any, reject: any) {
    this.http.get<any>('https://allcurrency-5081e-default-rtdb.firebaseio.com/exchange-rate.json')
      .subscribe(
        (data) => {
          if (data && data.data) {
            data.data.forEach((item: { code: string; rate: number; }) => {
              const index = this.currencies.findIndex(currency => currency.name === item.code);
              if (index !== -1) {
                this.currencies[index].rate = item.rate;
              }
            });
            resolve(this.currencies);
          } else {
            reject('Error fetching exchange rates');
          }
        },
        () => {
          reject();
        }
      );
  }
}
