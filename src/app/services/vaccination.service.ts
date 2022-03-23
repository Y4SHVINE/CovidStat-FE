import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  private createVaccinationUrl = API.COVID_STAT_BE + "vaccination";

  constructor(private http: HttpClient) {}

  createVaccination = (vaccination) => {
    return this.http.post<any>(this.createVaccinationUrl, vaccination);
  };
}
