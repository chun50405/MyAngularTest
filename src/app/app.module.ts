// Module start
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
// Module end
// Interceptor start
import { AuthInterceptor } from './interceptors/auth.interceptor';
// Interceptor end
// Component start
import { TopBarMenuComponent } from './top-bar-menu/top-bar-menu.component';
import { SingleStockInfoComponent } from './single-stock-info/single-stock-info.component';
import { SelfSelectStockComponent } from './self-select-stock/self-select-stock.component';
import { LoginComponent } from './login/login.component';

import { AlertModalComponent } from './modals/alerts/alert-modal.component';
import { LoadingModalComponent } from './modals/alerts/loading-modal.component';
import { RiskAssessmentComponent } from './risk-assessment/risk-assessment.component';
// Component end

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  { path: 'singleStockInfo', component: SingleStockInfoComponent },
  { path: 'selfSelectStock', component: SelfSelectStockComponent },
  { path: 'riskAssessment', component: RiskAssessmentComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    TopBarMenuComponent,
    SingleStockInfoComponent,
    SelfSelectStockComponent,
    LoginComponent,
    AlertModalComponent,
    LoadingModalComponent,
    RiskAssessmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    ChartModule,
    RouterModule.forRoot(routes),
    TypeaheadModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
