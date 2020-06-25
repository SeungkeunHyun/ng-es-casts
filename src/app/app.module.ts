import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from  '@angular/material/toolbar';
//, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MainToolbarComponent } from './components/main-toolbar/main-toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component';
import { RealEstateComponent } from './components/real-estate/real-estate.component';
import { StocksComponent } from './components/stocks/stocks.component';

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    ExchangeRateComponent,
    RealEstateComponent,
    StocksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,MatTableModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
