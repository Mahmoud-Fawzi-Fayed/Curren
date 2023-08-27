import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from './Currency';
import { CurrencyServiceComponent } from './currency-service/currency-service.component';
import { AppStateService } from './app-state-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  activeButton: 'Convert' | 'Compare' = 'Convert';
  title = 'currency-exchange';
  public isDataAvailable = false;
  public failedToLoad = false;
  private _from!: Currency;
  private to!: Currency;
  public amount_value!: string;
  @ViewChild('from', { static: false })
  fromCmp!: ElementRef;
  @ViewChild('to', { static: false })
  toCmp!: ElementRef;
  @ViewChild('amount_input', { static: false })
  amount_input!: ElementRef;
  @ViewChild('submitBtn', { static: false })
  submitBtn!: ElementRef;
  @ViewChild('formExchange', { static: false })
  formExchange!: ElementRef;


  public resultFrom!: string;
  public resultTo!: string;
  public resultInfo!: string;
  public isResult = false;
  public lastUpdate!: string;

  get from_name() {
    return this._from?.name;
  }

  constructor(
    private modalService: NgbModal,
    public service: CurrencyServiceComponent,
    public appStateService: AppStateService
  ) {}

  setActiveButton(button: 'Convert' | 'Compare') {
    this.appStateService.setActiveMode(button);
  }
  



  public open(modal: any): void {
    this.modalService.open(modal);
  }

  public selectFrom = (currency: Currency): void => {
    this._from = currency;
    if (this.isResult) this.exchange();
  };

  public selectTo = (currency: Currency): void => {
    this.to = currency;
    if (this.isResult) this.exchange();
  };

  changeAmountValue() {
    this.amount_value = (Math.round(+this.amount_value * 100) / 100).toFixed(2);
    localStorage.setItem('amount', this.amount_value);
    if (this.isResult) this.exchange();
  }


  public exchange() {
    let rateBase = this.to.rate / this._from.rate;
    let result = +this.amount_value * rateBase;
    this.resultFrom = this.amount_value + this._from.name + '=';
    this.resultTo = result.toFixed(2) + this.to.name;
  }

  ngOnInit(): void {
    this.service.getCurrenciesPromise().then(
      (data) => {
        this._from = data[0];
        this.to = data[1];
        this.isDataAvailable = true;
      },
      () => {
        this.failedToLoad = true;
      }
    );

    let localAmount = localStorage.getItem('amount');
    this.amount_value = localAmount ? localAmount : (1).toFixed(2);
  }

  onConvertClick(): void {
    this.exchange();
    this.isResult = true;
    const date = new Date(this.service.getLastUpdate());
    this.lastUpdate = date.toLocaleString() + ' UTC';
  }

  windowResize(): void {
    this.submitBtn.nativeElement.style.width =
      this.formExchange.nativeElement.style.width;
  }
}
