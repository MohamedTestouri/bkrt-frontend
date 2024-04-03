import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { OverlayModule } from '@angular/cdk/overlay'
import { CdkMenuModule } from '@angular/cdk/menu'
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    }),
    OverlayModule,
    CdkMenuModule,
    CarouselModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxIntlTelInputModule,
    NgSelectModule
  ],
  exports: [
    ToastrModule,
    OverlayModule,
    CdkMenuModule,
    CarouselModule,
    TimepickerModule,
    BsDatepickerModule,
    NgxIntlTelInputModule,
    NgSelectModule
  ]
})
export class SharedModule { }
