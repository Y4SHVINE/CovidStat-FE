import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentStat } from '../models/currentStatModel';
import { HistoryStat } from '../models/historyStatModel';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private currentStat = "https://www.hpb.health.gov.lk/api/get-current-statistical";
  private historyStat = "https://hpb.health.gov.lk/api/get-statistical-history-data";

  constructor(private http: HttpClient) { }

  getCurrentStats = () =>{
    return this.http.get<CurrentStat>(this.currentStat);
  }

  getHistoricalStats = () =>{
    return this.http.get<HistoryStat>(this.historyStat);
  }
}
