import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DemandeAppointment } from '../models/demandeAppointment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeAppointmentService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  create(model: any) {
    return this.http.post(`${this.baseUrl}DemandeAppointment/create`, model).pipe(
      map(response => {

      })
    )
  }
}
