import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticateUrl = API.COVID_STAT_BE + "user/Authenticate";
  registerUserUrl = API.COVID_STAT_BE + "user";
  getUserByEmailUrl= API.COVID_STAT_BE + "User?email="

  constructor(private http: HttpClient) { }

  authenticateUser = (user) =>{
    return this.http.post<any>(this.authenticateUrl,user);
  }

  createUser = (user)=>{
    return this.http.post<any>(this.registerUserUrl,user);
  }

  getUserByEmail = (email)=>{
    return this.http.get<any>(this.getUserByEmailUrl + email);
  }
}
