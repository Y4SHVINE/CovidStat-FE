import { Component, Input, OnInit } from '@angular/core';
import { VaccinationService } from '../../../services/vaccination.service';
import { getUserNIC } from '../../../utils/user.util';

@Component({
  selector: 'vaccinations',
  templateUrl: './vaccinations.component.html',
  styleUrls: ['./vaccinations.component.scss']
})
export class VaccinationsComponent implements OnInit {
  @Input() profile;

  vaccinationData=[];

  constructor(private vaccinationService:VaccinationService) { }

  ngOnInit(): void {
    this.getVaccination();
  }

  // get vaccination data
  getVaccination =() =>{
    this.vaccinationService.getVaccinationByNIC(getUserNIC()).subscribe(res=>{
      if(res){
        this.vaccinationData =(res.result || []).sort((a,b)=>{
          return new Date(a.dateOfVaccination).getDate() - new Date(b.dateOfVaccination).getDate();
        });
      }
    },error=>{
      console.log(error);
    })
  }

  getFormattedDate = (date)=>{
    return new Date(date).toISOString().split("T")[0];
  }

  getNextVaccinationDate = () =>{
    if(this.vaccinationData?.length > 0){
      const lastVaccinationDate = new Date(this.vaccinationData[this.vaccinationData.length-1].dateOfVaccination);
      return new Date(lastVaccinationDate.setMonth(lastVaccinationDate.getMonth() + 3)).toISOString().split("T")[0];
    }
    return '';
  }
}
