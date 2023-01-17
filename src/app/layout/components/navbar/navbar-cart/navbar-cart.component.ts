import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EcommerceService } from 'app/main/apps/ecommerce/ecommerce.service';
import { Plan } from 'app/layout/components/navbar/ecommerce.model';
import { CartService } from 'app/layout/components/navbar/cart.service';


@Component({
  selector: 'app-navbar-cart',
  templateUrl: './navbar-cart.component.html'
})
export class NavbarCartComponent implements OnInit {
  // Public
  public products = this._cartService.products;
  public cartListLength;

  constructor(private _cartService: CartService) {

  }

  removeFromCart(product) {
    /**
     * if (product.isInCart === true) {
      this._ecommerceService.removeFromCart(product.id).then(res => {
        product.isInCart = false;
      });
    }
     */
  }

  ngOnInit(): void {

    /**
     * // Get Products
    this._ecommerceService.getProducts();

    // Get Cart List
    this._ecommerceService.getCartList();

    // Subscribe to Cart List
    this._ecommerceService.onCartListChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.cartList = res;
      this.cartListLength = this.cartList.length;
      // this.cartListLength = '1';
    });

    // Subscribe to ProductList change
    this._ecommerceService.onProductListChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.products = res;

      if (this.products.length) {
        // update product is in CartList : Boolean
        this.products.forEach(product => {
          product.isInCart = this.cartList.findIndex(p => p.productId === product.id) > -1;
        });
      }
     
    });*/
  }
}
