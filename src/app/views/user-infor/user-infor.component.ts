import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-user-infor',
  templateUrl: './user-infor.component.html',
  styleUrls: ['./user-infor.component.scss']
})
export class UserInforComponent implements OnInit {

  nic = '';
  vaccinationData = [];

  constructor(private route:ActivatedRoute, private publicService:PublicService,
    private toastr: ToastrService) {
    this.nic = this.route.snapshot.paramMap.get('nic');
    this.getVaccinationInfor();
  }

  ngOnInit(): void {
  }

  getFormattedDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  // get Vaccination Infor
  getVaccinationInfor = () =>{
    this.publicService.getPublicVaccinationByNIC(this.nic).subscribe(res=>{
      this.vaccinationData = (res || []);
    },error=>{
      console.log(error);
      this.toastr.error("Someting went wrong!", "Error");
    })
  }

}
