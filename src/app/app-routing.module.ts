import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyCompareComponent } from './currency-compare/currency-compare.component'; // Adjust the path as needed

const routes: Routes = [
    { path: 'currency-compare', component: CurrencyCompareComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
