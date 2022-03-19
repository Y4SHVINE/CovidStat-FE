import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'travel-info',
  templateUrl: './travel-info.component.html',
  styleUrls: ['./travel-info.component.scss']
})
export class TravelInfoComponent implements OnInit {

  @Input() profile;

  travelForm:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.travelForm = new FormGroup({
      counntry: new FormControl(''),
      dateOfDepature: new FormControl(),
      dateOfArrival: new FormControl(),
    })
  }

}
