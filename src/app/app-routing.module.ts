import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { RealEstateComponent } from './components/real-estate/real-estate.component';

const routes: Routes = [{ path: 'exchange-rate', component: ExchangeRateComponent },
{ path: 'realestate', component: RealEstateComponent },
{ path: 'stocks', component: StocksComponent },
{ path: '',   redirectTo: '/exchange-rate', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
