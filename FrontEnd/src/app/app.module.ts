import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PersonComponent } from './peson/person.component';
import { PersonPageComponent } from './peson/person-page/person-page.component';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';
import { ApiTokenInterceptor } from './api/api-token.interceptor';
import { ApiErrorInterceptor } from './api/api-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonPageComponent,
    UserComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
