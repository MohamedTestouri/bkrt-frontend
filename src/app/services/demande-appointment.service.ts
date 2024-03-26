import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Demande } from '../models/demande';
import { DemandePackComponent } from '../components/subscriptions-packages/demande-pack/demande-pack.component';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeAppointmentService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  create(model: any) {
    return this.http.post<Demande>(this.baseUrl + 'demande/create', model).pipe(
      map(response => {
        console.log("api", this.baseUrl + 'demande/create', model)
        console.log("res", response)
        const Demande = response;
      })
    )
  }
}
