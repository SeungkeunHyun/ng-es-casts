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
import {MatSortModule} from '@angular/material/sort';
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component';
import { RealEstateComponent } from './components/real-estate/real-estate.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { CommonSpinnerComponent } from './components/common-spinner/common-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { RealEstateGovComponent } from './components/real-estate-gov/real-estate-gov.component';
import { RealEstateSeoulComponent } from './components/real-estate-seoul/real-estate-seoul.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    ExchangeRateComponent,
    RealEstateComponent,
    StocksComponent,
    CommonSpinnerComponent,
    RealEstateGovComponent,
    RealEstateSeoulComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule, MatIconModule, MatSidenavModule
    , MatListModule, MatButtonModule,MatTableModule, MatSortModule
    , MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatCardModule
    , MatTabsModule, MatSelectModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
