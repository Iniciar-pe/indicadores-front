import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PagoProvider } from '../pago';


@Component({
  selector: 'app-ecommerce-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {

  constructor(
    private pago: PagoProvider,
    private _router: Router,
  ) {}

  get order() {
    return this.pago.order;
  }

  ngOnInit(): void {
 
  }

  goTo() {
    this._router.navigate(['/apps/comercio/lista']);
  }


}
