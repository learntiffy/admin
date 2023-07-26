import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './interceptor';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    RippleModule,
    ButtonModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  }, {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler,
  },],
  bootstrap: [AppComponent],
})
export class AppModule { }
