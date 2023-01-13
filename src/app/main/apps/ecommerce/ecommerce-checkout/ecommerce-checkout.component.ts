import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from 'app/layout/components/navbar/cart.service';
import Stepper from 'bs-stepper';
import { Cart, Plan } from '../../../../layout/components/navbar/ecommerce.model';
import { EcommerceService } from '../ecommerce.service';

@Component({
  selector: 'app-ecommerce-checkout',
  templateUrl: './ecommerce-checkout.component.html',
  styleUrls: ['./ecommerce-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceCheckoutComponent implements OnInit {
  // Public
  public contentHeader: object;
  public products: Cart[] = this._cartService.products;
  public cartLists;
  public wishlist;
  public total = '0';

  public address = {
    fullNameVar: '',
    numberVar: '',
    flatVar: '',
    landmarkVar: '',
    cityVar: '',
    pincodeVar: '',
    stateVar: ''
  };

  // Private
  private checkoutStepper: Stepper;

  constructor(
    private _ecommerceService: EcommerceService,
    private _cartService: CartService
    ) {}

  nextStep() {
    this.checkoutStepper.next();
  }

  previousStep() {
    this.checkoutStepper.previous();
  }

  validateNextStep(addressForm) {
    if (addressForm.valid) {
      this.nextStep();
    }
  }


  ngOnInit(): void {

    this.checkoutStepper = new Stepper(document.querySelector('#checkoutStepper'), {
      linear: true,
      animation: true
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Carrito de compras',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
        ]
      }
    };
  }

  periodText(product) {
    return this._ecommerceService.periodText(product);
  }

  calculate(product) {
    return this._ecommerceService.calculate(product);
  }

  totalCalculate() {
    const totalInp = document.getElementsByName('total[]');
    let total = 0;
    totalInp.forEach(item => {
      total = total + Number((item as HTMLInputElement).value);
    });
    return total.toFixed(2);
  }

}
