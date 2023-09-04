import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './modules/header/header.component';
import { UserComponent } from './modules/user/user.component';
import { ErrorComponent } from './modules/error/error.component';
import { ApiTokenInterceptor } from './interceptors/api-token.interceptor';
import { ApiErrorInterceptor } from './interceptors/api-error.interceptor';
import { MemberComponent } from './modules/member/member.component';
import { MemberListComponent } from './modules/member/member-list/member-list.component';
import { MemberCardComponent } from './modules/member/member-card/member-card.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    UserComponent,
    HeaderComponent,
    ErrorComponent,
    MemberListComponent,
    MemberCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TabsModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
