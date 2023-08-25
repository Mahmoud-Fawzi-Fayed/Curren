import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from './Currency';
import { Router } from '@angular/router';
import { CurrencyServiceComponent } from './currency-service/currency-service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'currency-exchange';
  public isDataAvailable = false;
  public failedToLoad = false;
  private _from;
  private to;
  public amount_value;
  @ViewChild('from') fromCmp;
  @ViewChild('to') toCmp;
  @ViewChild('amount_input', { static: false }) amount_input;
  @ViewChild('submitBtn', { static: false }) submitBtn;
  @ViewChild('formExchange', { static: false }) formExchange;


  activeButton: string = 'Convert';

  public resultFrom;
  public resultTo;
  public resultInfo;
  public isResult = false;
  public lastUpdate;
  get from_name() {
    return this._from.name;
  }

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public service: CurrencyServiceComponent
  ) {}

  setActiveButton(button: string): void {
    this.activeButton = button;
  }

  navigateToCompare(): void {
    this.setActiveButton('Compare');
    this.router.navigate(['/currency-compare']);
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
    this.amount_value = (Math.round(this.amount_value * 100) / 100).toFixed(2);
    localStorage.setItem('amount', this.amount_value);
    if (this.isResult) this.exchange();
  }

  public switchCurrencies() {
    let temp: Currency = this._from;
    this.fromCmp.selectCurrency(this.to);
    this.toCmp.selectCurrency(temp);
    if (this.isResult) this.exchange();
  }

  public exchange() {
    let rateBase = this.to.rate / this._from.rate;
    let result = this.amount_value * rateBase;
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
  ngAfterViewInit(): void {}
}
