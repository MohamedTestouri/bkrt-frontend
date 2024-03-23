import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UpdateInfo } from '../models/updateInfo';
import { UpdatePassword } from '../models/updatePassword';
import { Observable, map } from 'rxjs';
import { Agriculteurs } from '../models/agriculteurs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserInfo() {
    return this.http.get<UpdateInfo>(this.baseUrl + 'users/username');
  }

  updateInfo(model: any) {
    return this.http.put<UpdateInfo>(this.baseUrl + 'users/edit-info', model).pipe(
      map(updateInfo => {
        if (updateInfo) {
        }
      })
    )
  } 
  
  updatePassword(model: any) {
    return this.http.put<UpdatePassword>(this.baseUrl + 'users/change-password', model).pipe(
      map(updateInfo => {
        if (updateInfo) {
        }
      })
    )
  } 

  getAgriculteurs(): Observable<Agriculteurs[]> {
    return this.http.get<Agriculteurs[]>(this.baseUrl + 'users/getAgriculteurs');
  }
}
