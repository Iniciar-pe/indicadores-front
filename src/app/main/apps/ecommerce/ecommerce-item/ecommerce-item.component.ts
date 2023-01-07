import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { Period, Plan } from '../ecommerce.model';
import { EcommerceService } from '../ecommerce.service';

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

  constructor(private ecommerceService: EcommerceService) {}

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
    const mount = this.mount;
    const period = this.periodList;
    this.ecommerceService.planesList = this.ecommerceService.planesList.map(item => {
      if (item.id === product.id) {
        item.isInCart = true;
        item.mount = mount;
        item.selectedPeriod = period;
      }
      return item;
    });
    this.ecommerceService.addProduct();
  }

  ngOnInit(): void {
    this.ruta = environment.apiUrl;
  }
}
