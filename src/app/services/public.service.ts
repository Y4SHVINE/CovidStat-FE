import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private vaccinationUrl = API.COVID_STAT_BE + "vaccination";

  constructor(private http: HttpClient) { }

  getPublicVaccinationByNIC = (nic) => {
    return this.http.get<any>(`${this.vaccinationUrl}/public/${nic}`);
  };
}
