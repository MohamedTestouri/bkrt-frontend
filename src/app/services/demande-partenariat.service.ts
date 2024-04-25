import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DemandePartenariat } from '../models/demande-partenariat';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandePartenariatService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  create(model: any) {
    return this.http.post<DemandePartenariat>(this.baseUrl + 'demandePartenariat/create', model).pipe(
      map((response: DemandePartenariat) => {
        const Terrain = response;
      })
    )
  }
}
