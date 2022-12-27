import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Period, Plan } from '../ecommerce.model';
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
  public products: Plan[];
  public period: Period;
  public wishlist;

  constructor(
    private ecommerceService: EcommerceService
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
      this.ecommerceService.planesList = this.products;
    });
  }
}
