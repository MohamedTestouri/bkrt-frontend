import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-pack',
  templateUrl: './demande-pack.component.html',
  styleUrls: ['./demande-pack.component.css']
})
export class DemandePackComponent implements OnInit {

  constructor(private router : Router, private fb: FormBuilder) { }
  number: number = 0;
  demandePackForm: FormGroup;
  
  ngOnInit(): void {
    this.InitializeForm();
  }
  increment() {
    this.number++;
  }

  decrement() {
    if (this.number > 0) {
      this.number--;
    }
  }

  checkValidity() {
    if (this.number < 0) {
      this.number = 0;
    }
  }
  InitializeForm()
  {
    numberInput:['']
  }
}
