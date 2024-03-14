import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { OverlayModule } from '@angular/cdk/overlay'
import { CdkMenuModule } from '@angular/cdk/menu'
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
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
    NgxIntlTelInputModule,
    NgSelectModule
  ],
  exports: [
    ToastrModule,
    OverlayModule,
    CdkMenuModule,
    CarouselModule,
    NgxIntlTelInputModule,
    NgSelectModule
  ]
})
export class SharedModule { }
