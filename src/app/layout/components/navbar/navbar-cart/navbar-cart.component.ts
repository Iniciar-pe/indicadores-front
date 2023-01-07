import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EcommerceService } from 'app/main/apps/ecommerce/ecommerce.service';
import { Plan } from 'app/main/apps/ecommerce/ecommerce.model';


@Component({
  selector: 'app-navbar-cart',
  templateUrl: './navbar-cart.component.html'
})
export class NavbarCartComponent implements OnInit {
  // Public
  public products: Plan[] = this._ecommerceService.planesList;
  public cartList = [];
  public cartListLength;

  private _unsubscribeAll: Subject<any>;

  constructor(private _ecommerceService: EcommerceService) {
    this._unsubscribeAll = new Subject();
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

    this._ecommerceService.getProduct$().subscribe(res => {
      this.products = res;
      console.log("aqui", this.products);
      this.cartListLength = this.products.length;
    });


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
