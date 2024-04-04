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
    return this.http.post<DemandeAppointment>(this.baseUrl + 'demandeAppointment/create', model).pipe(
      map(response => {
        console.log("api", this.baseUrl + 'demande/create', model)
        console.log("res", response)
        const Demande = response;
      })
    )
  }
}
