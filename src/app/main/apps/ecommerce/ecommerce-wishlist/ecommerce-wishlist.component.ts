import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ecommerce-wishlist',
  templateUrl: './ecommerce-wishlist.component.html',
  styleUrls: ['./ecommerce-wishlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceWishlistComponent implements OnInit {

  public contentHeader: object;
  public products;
  public wishlist;

  constructor() {}

  ngOnInit(): void {
    this.products = [
      {
        image: 'assets/images/pages/eCommerce/11.png',
        name: 'Licencia Individual',
        description: 'Texto aleatorio Texto aleatorio Texto aleatorio Texto aleatorio Texto aleatorio',
        isInCart: false,
      },
      {
        image: 'assets/images/pages/eCommerce/11.png',
        name: 'Licencia Empresa con sucursal',
        description: 'Texto aleatorio Texto aleatorio Texto aleatorio Texto aleatorio Texto aleatorio',
        isInCart: false,
      },
      {
        image: 'assets/images/pages/eCommerce/11.png',
        name: 'Licencia para donar',
        description: 'Texto aleatorio Texto aleatorio Texto aleatorio Texto aleatorio Texto aleatorio',
        isInCart: false,
      }
    ];

    // content header
    this.contentHeader = {
      headerTitle: 'Compra de licencia',
      actionButton: true,
      breadcrumb: {}
    };
  }
}
