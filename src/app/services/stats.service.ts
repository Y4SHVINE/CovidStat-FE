import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private vaccinationUrl = API.COVID_STAT_BE + "Statistics";

  constructor(private http: HttpClient) {}

  getStats = () => {
    return this.http.get<any>(`${this.vaccinationUrl}/Vaccine`);
  };

}
