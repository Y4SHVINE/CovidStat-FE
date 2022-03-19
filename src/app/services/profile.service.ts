import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private getUserProfile = API.COVID_STAT_BE + "profile?nIC="
  private createProfile = API.COVID_STAT_BE + "profile"
  private updateProfile = API.COVID_STAT_BE + "profile/"

  constructor(private http: HttpClient) { }

  getUserByNic = (nic) =>{
    return this.http.get<any>(this.getUserProfile + nic);
  }

  createUserProfile = (userProfile)=>{
    return this.http.post<any>(this.createProfile,userProfile);
  }

  updateUserProfile = (userProfile,nic)=>{
    return this.http.put<any>(this.updateProfile + nic ,userProfile);
  }

}
