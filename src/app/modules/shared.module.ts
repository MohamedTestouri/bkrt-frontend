import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { OverlayModule } from '@angular/cdk/overlay'
import { CdkMenuModule } from '@angular/cdk/menu'
import { CarouselModule } from 'ngx-bootstrap/carousel';



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
  ],
  exports: [
    ToastrModule,
    OverlayModule,
    CdkMenuModule,
    CarouselModule
  ]
})
export class SharedModule { }
