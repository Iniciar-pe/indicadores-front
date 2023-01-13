import { Injectable } from '@angular/core';
import { Cart, Plan } from './ecommerce.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public _products: Cart[] = [];

  constructor() {

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

    this._products.push({
      id: product.id,
      image: product.image,
      description: product.description,
      name: product.name,
      type: product.type,
      isInCart: true,
      selectedPeriod: period,
      mount: mount,
    });

  }

}
