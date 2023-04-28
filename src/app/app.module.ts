// Module start
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
// Module end


// Component start
import { TopBarMenuComponent } from './top-bar-menu/top-bar-menu.component';
import { SingleStockInfoComponent } from './single-stock-info/single-stock-info.component';
import { SelfSelectStockComponent } from './self-select-stock/self-select-stock.component';
// Component end

const routes: Routes = [
  { path: '', redirectTo: '/selfSelectStock', pathMatch: 'full' },
  { path: 'singleStockInfo', component: SingleStockInfoComponent },
  { path: 'selfSelectStock', component: SelfSelectStockComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    TopBarMenuComponent,
    SingleStockInfoComponent,
    SelfSelectStockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartModule,
    RouterModule.forRoot(routes),
    TypeaheadModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
