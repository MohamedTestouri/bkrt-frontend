import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-auth-left-carousel',
  templateUrl: './auth-left-carousel.component.html',
  styleUrls: ['./auth-left-carousel.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true } }
  ]
})
export class AuthLeftCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
