import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CurrenciesComponent } from './currency-selector/currencies/currencies.component';
import { CurrencySelectorComponent } from './currency-selector/currency-selector.component';
import { CurrencyServiceComponent } from './currency-service/currency-service.component';
import { CurrencyCompareComponent } from './currency-compare/currency-compare.component';
@NgModule({
  declarations: [AppComponent, CurrenciesComponent, CurrencySelectorComponent, CurrencyCompareComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgbModule, HttpClientModule],
  providers: [CurrencyServiceComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
