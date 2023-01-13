import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { CartService } from '../../../../layout/components/navbar/cart.service';
import { Plan } from '../../../../layout/components/navbar/ecommerce.model';

@Component({
  selector: 'app-ecommerce-item',
  templateUrl: './ecommerce-item.component.html',
  styleUrls: ['./ecommerce-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceItemComponent implements OnInit {
  // Input Decorotor
  @Input() product: Plan;
  public ruta: string;
  @Input() period;
  public mount = 1;
  public periodList = 1;

  constructor(
    private _cartService: CartService
    ) {}

  toggleWishlist(product) {
    /**if (product.isInWishlist === true) {
      this._ecommerceService.removeFromWishlist(product.id).then(res => {
        product.isInWishlist = false;
      });
    } else {
      this._ecommerceService.addToWishlist(product.id).then(res => {
        product.isInWishlist = true;
      });
    } */
  }

  addToCart(product: Plan) {
    this._cartService.addProduct(product, this.mount, this.periodList);
    this.product.isInCart = true;
  }

  ngOnInit(): void {
    this.ruta = environment.apiUrl;
  }
}
