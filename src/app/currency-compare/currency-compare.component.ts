import { Component, OnInit } from '@angular/core';
import { Currency } from '../Currency';
import { CurrencyServiceComponent } from '../currency-service/currency-service.component';


@Component({
  selector: 'app-currency-compare',
  templateUrl: './currency-compare.component.html',
  styleUrls: ['./currency-compare.component.scss']
})
export class CurrencyCompareComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
