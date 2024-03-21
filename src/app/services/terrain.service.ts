import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Terrain } from '../models/terrain';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  create(model: any) {
    return this.http.post<Terrain>(this.baseUrl + 'terrain/create', model).pipe(
      map((response: Terrain) => {
        const Terrain = response;
      })
    )
  }

  getTerrainsByAgr(user : User) {
    return this.http.get<Terrain[]>(this.baseUrl + 'terrain/terrains');
  }

}
