import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccinationRoutingModule } from './vaccination-routing.module';
import { VaccinationComponent } from '../vaccination/vaccination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular7-ladda';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    VaccinationComponent
  ],
  imports: [
    CommonModule,
    VaccinationRoutingModule,
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
export class VaccinationModule { }
