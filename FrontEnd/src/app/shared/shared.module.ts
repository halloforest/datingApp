import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule.forRoot(),    
    NgxSpinnerModule.forRoot({type: 'line-scale-party'})
  ],
  exports: [
    TabsModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
