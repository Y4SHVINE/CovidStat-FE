import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DigitalSignatureComponent } from './digital-signature/digital-signature.component';
import { VaccinationsComponent } from './vaccinations/vaccinations.component';
import { TravelInfoComponent } from './travel-info/travel-info.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular7-ladda';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    ProfileComponent,
    DigitalSignatureComponent,
    VaccinationsComponent,
    TravelInfoComponent,
    BasicInfoComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule.forRoot({
      style: "slide-right",
    }),
    ToastrModule.forRoot(),
  ],
  providers:[
    ToastrService
  ]
})
export class ProfileModule { }
