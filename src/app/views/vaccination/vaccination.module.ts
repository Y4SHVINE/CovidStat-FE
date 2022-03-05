import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccinationRoutingModule } from './vaccination-routing.module';
import { VaccinationComponent } from '../vaccination/vaccination.component';


@NgModule({
  declarations: [
    VaccinationComponent
  ],
  imports: [
    CommonModule,
    VaccinationRoutingModule
  ]
})
export class VaccinationModule { }
