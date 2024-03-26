import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DemandePacks } from 'src/app/models/demande-packs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandePacksService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  create(model: any) {
    return this.http.post<DemandePacks>(this.baseUrl + 'demandePack/create', model).pipe(
      map((response: DemandePacks) => {
        const Terrain = response;
      })
    )
  }
}
