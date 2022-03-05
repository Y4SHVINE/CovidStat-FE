import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DigitalSignatureComponent } from './digital-signature/digital-signature.component';
import { VaccinationsComponent } from './vaccinations/vaccinations.component';
import { TravelInfoComponent } from './travel-info/travel-info.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';


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
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
