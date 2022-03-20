import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "../../../services/dashboard.service";
import { ProfileService } from "../../../services/profile.service";
import { getUserNIC } from "../../../utils/user.util";

@Component({
  selector: "travel-info",
  templateUrl: "./travel-info.component.html",
  styleUrls: ["./travel-info.component.scss"],
})
export class TravelInfoComponent implements OnInit {
  @Input() profile;

  savingtravelData = false;
  travelData =[];
  countryData =[];
  travelForm: FormGroup;

  constructor(private profileService: ProfileService,
    private toastr: ToastrService,
    private dashboardService:DashboardService) {}

  ngOnInit(): void {
    this.travelData = this.profile?.travels;
    this.travelForm = new FormGroup({
      country: new FormControl("", [Validators.required]),
      dateOfDepature: new FormControl(null, [Validators.required]),
      dateOfArrival: new FormControl(null, [Validators.required]),
    });
    this.getCountryList();
  }

  //get Counntry list
  getCountryList = () =>{
    this.dashboardService.getCountyStats().subscribe(res=>{
        this.countryData = (res || []).filter(a=> a.country !== "World").map(a=> a.country);
    })
  }

  createTravel = () => {
    this.savingtravelData = true;
    if (this.travelForm.valid) {
      this.profileService
        .createTravelData(getUserNIC(), this.travelForm.value)
        .subscribe(
          (res) => {
            this.savingtravelData = false;
            this.travelData.push(this.travelForm.value);
            this.toastr.success('Travel Data Created!', 'Success');
          },
          (error) => {
            this.savingtravelData = false;
            console.log(error);
            this.toastr.error('Something went wrong!', 'Error');
          }
        );
    }
  };
}
