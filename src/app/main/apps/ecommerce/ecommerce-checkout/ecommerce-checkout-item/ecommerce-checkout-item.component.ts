import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { environment } from 'environments/environment';
import { EcommerceService } from '../../ecommerce.service';
import moment from 'moment';
import { CartService } from 'app/layout/components/navbar/cart.service';

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
  mount: number;

  constructor(
    private _ecommerceService: EcommerceService,
    private _cartService: CartService
    ) {

    }

  removeFromCart() {
    this._cartService.removeFromCart(this.product);
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
    this.mount = this.product.mount;
    this.ruta = environment.apiUrl;
    this.selectedPeriod = (this.product.selectedPeriod === 1);
    // this.calculate();
    this.calculatePeriod();
  }

  calculatePeriod() {
    this.product.selectedPeriod = (this.selectedPeriod ? 1 : 2);
    const numberPeriod = this._ecommerceService.planesList
      .filter(item => item.id === this.product.id)[0].period
      .filter(val => val.id === this.product.selectedPeriod)[0].number;

    const now = moment();
    this.date = now.format('DD/MM/YYYY');
    this.dateEnd = now.add(numberPeriod, 'month').format('DD/MM/YYYY');
  }

  countChange(value) {
    this.mount = value;
    const plan = this._ecommerceService.planesList.filter(item => item.id === this.product.id)[0];
    this._cartService.updateProduct(plan, this.product, value, this.selectedPeriod);
    this.calculatePeriod();
  }

  inputChange(value) {
    const plan = this._ecommerceService.planesList.filter(item => item.id === this.product.id)[0];
    this._cartService.updateProduct(plan, this.product, this.mount, this.selectedPeriod);
    this.calculatePeriod();
  }
}
