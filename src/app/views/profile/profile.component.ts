import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { getUserNIC } from '../../utils/user.util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData = null;
  profileLoading = true;

  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {
    this.getProfileinfor();
  }

  getProfileinfor = () =>{
    this.profileService.getUserByNic(getUserNIC()).subscribe(res=>{
      if(res?.result?.length > 0){
        this.profileData = res.result[0];
        this.profileLoading = false;
      }
    },error=>{
      console.log(error);
      this.profileLoading = false;
    })
  }


}
