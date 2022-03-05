import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationComponent } from './vaccination.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Vaccination'
    },
    children: [
      {
        path: '',
        component: VaccinationComponent,
        data: {
          title: ''
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccinationRoutingModule { }
