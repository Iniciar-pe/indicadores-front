import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../../../layout/components/navbar/cart.service';
import { Cart, Period, Plan } from '../../../../layout/components/navbar/ecommerce.model';
import { EcommerceService } from '../ecommerce.service';

@Component({
  selector: 'app-ecommerce-wishlist',
  templateUrl: './ecommerce-wishlist.component.html',
  styleUrls: ['./ecommerce-wishlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceWishlistComponent implements OnInit {

  public contentHeader: object;
  public products: Cart[];
  public period: Period;
  public wishlist;

  constructor(
    private ecommerceService: EcommerceService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getPlanes();
    // content header
    this.contentHeader = {
      headerTitle: 'Compra de licencia',
      actionButton: true,
      breadcrumb: {}
    };
  }

  getPlanes() {
    this.ecommerceService.getPlanes().subscribe(data => {
      this.products = data.planes;
      this.period = data.period;
      this.ecommerceService.planesList = data.planes;
      // this._cartService.products =  this._cartService.parsePlanToCart(data.planes);
    });
  }
}
