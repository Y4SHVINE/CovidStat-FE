import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProfileService } from "../../../services/profile.service";
import { getUserEmail, getUserNIC } from "../../../utils/user.util";

@Component({
  selector: "basic-info",
  templateUrl: "./basic-info.component.html",
  styleUrls: ["./basic-info.component.scss"],
})
export class BasicInfoComponent implements OnInit {
  @Input() profile;

  basicInfo: FormGroup;
  maxDate = new Date().toISOString().split("T")[0];
  savingProfile = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.basicInfo = new FormGroup({
      id: new FormControl(this.profile?.id ?? 0),
      nIC: new FormControl(this.profile?.nic ?? "", [Validators.required]),
      fullName: new FormControl(this.profile?.fullName ?? ""),
      email: new FormControl(this.profile?.email ?? "", [Validators.required]),
      phoneNumber: new FormControl(this.profile?.phoneNumber ?? "", [
        Validators.pattern(/^(?:7|0|(?:\+94))[0-9]{9,10}$/),
      ]),
      dOB: new FormControl(
        this.profile?.dob ? this.profile?.dob.split("T")[0] : ""
      ),
      gender: new FormControl(this.profile?.gender ?? ""),
      martialStatus: new FormControl(this.profile?.martialStatus ?? ""),
    });
  }

  getNIC = () => getUserNIC();
  getEmail = () => getUserEmail();

  createProfile = () => {
    this.savingProfile = true;
    this.basicInfo.get("nIC").setValue(getUserNIC());
    this.basicInfo.get("email").setValue(getUserEmail());
    this.basicInfo
      .get("phoneNumber")
      .setValue(this.basicInfo.get("phoneNumber").value.toString());
    if (this.basicInfo.valid) {
      this.profileService.createUserProfile(this.basicInfo.value).subscribe(
        (res) => {
          if (res) {

            this.savingProfile = false;
          }
        },
        (error) => {
          console.log(error);
          this.savingProfile = false;
        }
      );
    }
  };
}
