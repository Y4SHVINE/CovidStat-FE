import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class VaccinationService {
  private vaccinationUrl = API.COVID_STAT_BE + "vaccination";

  constructor(private http: HttpClient) {}

  createVaccination = (vaccination) => {
    return this.http.post<any>(this.vaccinationUrl, vaccination);
  };

  getVaccinationByNIC = (nic) => {
    return this.http.get<any>(`${this.vaccinationUrl}?nIC=${nic}`);
  };

  createVaccineSideEffect = (id,sideEffect) => {
    return this.http.post<any>(`${this.vaccinationUrl}/sideeffect/${id}`,sideEffect);
  };
}
