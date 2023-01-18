import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Plan } from './ecommerce.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public _products: Cart[] = [];

  constructor(
    private _router: Router,
  ) {
    if (this._products.filter(item => item.isInCart).length <= 0) {
      this._router.navigate(['/apps/comercio/lista']);
    }
  }

  get products() {
    return this._products;
  }

  set products(products) {
    this._products = products;
  }

  parsePlanToCart(plan: Plan[]): Cart[] {
    return plan.map(item => {
      return {
        id: item.id,
        image: item.image,
        description: item.description,
        name: item.name,
        type: item.type,
        isInCart: item.isInCart,
        selectedPeriod: item.selectedPeriod,
        mount: item.mount,
      } as Cart;
    });
  }

  addProduct(product: Plan, mount: number, period: number) {
    if (!this.exist(product.id)) {
      this._products.push({
        id: product.id,
        image: product.image,
        description: product.description,
        name: product.name,
        type: product.type,
        isInCart: true,
        selectedPeriod: period,
        mount: mount,
        value: this.calculateUnitary(product, period, 1),
        periodText: this.periodText(product, period),
        price: this.calculate(product, period, mount)
      } as Cart);
    } else {
      this._products.map(item => {
        if (item.id === product.id) {
          item.isInCart = true;
          item.selectedPeriod = period;
          item.mount = mount;
          item.value = this.calculateUnitary(product, period, mount);
          item.periodText = this.periodText(product, period);
          item.price = this.calculate(product, period, mount);
        }
        return item;
      });
    }

  }

  calculate(product: Plan, period: number, mount: number) {
    const end = 9999999999;
    const price = product.period
      .filter(val => val.id === Number(period))[0].range
      .filter(value => value.start <= mount && mount <= (value.end ? value.end : end))[0].price;
    return String(Number(Number(price) * mount).toFixed(2));
  }

  calculateUnitary(product: Plan, period: number, mount: number) {
    const end = 9999999999;
    const price = product.period
      .filter(val => val.id === Number(period))[0].range
      .filter(value => value.start <= mount && mount <= (value.end ? value.end : end))[0].price;
    return Number(price).toFixed(2);
  }

  periodText(product: Plan, period: number) {
    return product.period.filter(val => val.id === Number(period))[0].description;
  }

  totalCalculate() {
    return this._products
      .filter(item => item.isInCart === true)
      .reduce(function (accumulator, value) {
        return Number(accumulator) + Number(value.price);
      }, 0).toFixed(2);
  }

  updateProduct(plan: Plan, product: Cart, mount: number, period: boolean) {
    this._products = this._products.map(item => {
      if (item.id === product.id) {
        item.selectedPeriod = (period ? 1 : 2);
        item.mount = mount;
        item.periodText = this.periodText(plan, (period ? 1 : 2));
        item.price = this.calculate(plan, (period ? 1 : 2), mount);
        item.value = this.calculateUnitary(plan,  (period ? 1 : 2), mount);
      }
      return item;
    });

  }

  removeFromCart(product) {
    this._products = this._products.map(item => {
      if (item.id === product.id) {
        item.isInCart = false;
      }
      return item;
    });

    if (this._products.filter(item => item.isInCart === true).length <= 0) {
      this._router.navigate(['/apps/comercio/lista']);
    }

  }

  exist(value: number) {
    return this._products.filter(item => item.id === value).length > 0;
  }

}
