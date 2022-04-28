import { Component, OnInit } from '@angular/core';
import { HOST } from '../../../../environments/environment';
import { getUserNIC } from '../../../utils/user.util';

@Component({
  selector: 'digital-signature',
  templateUrl: './digital-signature.component.html',
  styleUrls: ['./digital-signature.component.scss']
})
export class DigitalSignatureComponent implements OnInit {

  qrUrl = `${HOST.COVID_STAT_FE}/${getUserNIC()}/info`
  constructor() { }

  ngOnInit(): void {
  }

}
