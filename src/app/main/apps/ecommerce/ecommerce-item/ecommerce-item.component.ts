import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EcommerceService1 } from 'app/main/apps/ecommerce/ecommerce-1.service';
import { environment } from 'environments/environment';
import { Period } from '../ecommerce.model';

@Component({
  selector: 'app-ecommerce-item',
  templateUrl: './ecommerce-item.component.html',
  styleUrls: ['./ecommerce-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceItemComponent implements OnInit {
  // Input Decorotor
  @Input() product;
  @Input() isWishlistOpen = false;
  public ruta: string;
  @Input() period;

  constructor(private _ecommerceService: EcommerceService1) {}

  toggleWishlist(product) {
    if (product.isInWishlist === true) {
      this._ecommerceService.removeFromWishlist(product.id).then(res => {
        product.isInWishlist = false;
      });
    } else {
      this._ecommerceService.addToWishlist(product.id).then(res => {
        product.isInWishlist = true;
      });
    }
  }

  addToCart(product) {
    this._ecommerceService.addToCart(product.id).then(res => {
      product.isInCart = true;
    });
  }

  ngOnInit(): void {
    this.ruta = environment.apiUrl;
  }
}
