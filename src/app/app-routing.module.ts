import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyCompareComponent } from './currency-compare/currency-compare.component';
import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'currency-compare', component: CurrencyCompareComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
