import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  public submitted = false;
  public card = '1';

  get f() {
    return this.form.controls;
  }

  // Private
  private checkoutStepper: Stepper;

  constructor(
    private _cartService: CartService,
    private _formBuilder: FormBuilder,
    ) {}

  nextStep() {
    this.checkoutStepper.next();
  }

  submitPlan() {
    this.submitted = true;
    if (this.form.valid) {
      this.nextStep();
    }
  }

  previousStep() {
    this.checkoutStepper.previous();
  }

  ngOnInit(): void {

    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      number: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });


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

  totalCalculate() {
    return this._cartService.totalCalculate();
  }

}
