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
  private currentUserSource = new BehaviorSubject<User | null>(null);
  private terrain = new BehaviorSubject<Terrain | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient) { }

  create(model: any) {
    return this.http.post<Terrain>(this.baseUrl + 'terrain/create', model).pipe(
      map((response: Terrain) => {
        const Terrain = response;
      })
    )
  }
}
