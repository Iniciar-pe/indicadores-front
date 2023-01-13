import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { environment } from 'environments/environment';
import { EcommerceService } from '../../ecommerce.service';
import moment from 'moment';

@Component({
  selector: 'app-ecommerce-checkout-item',
  templateUrl: './ecommerce-checkout-item.component.html',
  styleUrls: ['../ecommerce-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceCheckoutItemComponent implements OnInit {
  // Input Decorator
  @Input() product;
  ruta: string;
  selectedPeriod: boolean;
  price: string;
  date: string;
  dateEnd: string;

  constructor(private _ecommerceService: EcommerceService) {}

  removeFromCart(product) {
    this._ecommerceService.removeFromCart(product);
  }

  toggleWishlist(product) {
    /*if (product.isInWishlist === true) {
      this._ecommerceService.removeFromWishlist(product.id).then(res => {
        product.isInWishlist = false;
      });
    } else {
      this._ecommerceService.addToWishlist(product.id).then(res => {
        product.isInWishlist = true;
      });
    }*/
  }

  ngOnInit(): void {
    this.ruta = environment.apiUrl;
    this.selectedPeriod = (this.product.selectedPeriod === 1);
    // this.calculate();
    // this.calculatePeriod();
  }

  calculate() {
    return this._ecommerceService.calculate(this.product);
  }

  calculatePeriod() {
    const numberPeriod = this._ecommerceService.planesList
      .filter(item => item.id === this.product.id)[0].period
      .filter(val => val.id === this.product.selectedPeriod)[0].number;
    console.log(numberPeriod);
    const now = moment();
    this.date = now.format('DD/MM/YYYY');
    this.dateEnd = now.add(numberPeriod, 'month').format('DD/MM/YYYY');
  }

  countChange(value, product) {
    this._ecommerceService.mount(value, product);
  }

  inputChange(value, product) {
    this._ecommerceService.inputChange(value, product);
  }
}
