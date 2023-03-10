import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/layout/components/navbar/cart.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-navbar-cart',
  templateUrl: './navbar-cart.component.html'
})

export class NavbarCartComponent implements OnInit {
  // Public
  public products = this._cartService.products;
  public cartListLength;
  public ruta: string;

  get elementActive() {
    return this.products.filter(item => item.isInCart === true).length;
  }

  constructor(private _cartService: CartService) {

  }

  totalCalculate() {
    return this._cartService.totalCalculate();
  }

  removeFromCart(product) {
    this._cartService.removeFromCart(product);
  }

  ngOnInit(): void {
    
    this.ruta = environment.apiUrl;
    this.products = this._cartService.products;
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
