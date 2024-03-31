import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pack } from '../models/pack';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getPackByName(name: string): Observable<Pack> {
    return this.http.get<Pack>(`${this.baseUrl}packs/pack-by-name/${name}`);
  }
}
