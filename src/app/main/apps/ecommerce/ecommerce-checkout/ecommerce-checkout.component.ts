import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'app/auth/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/auth/service';
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
  public currentUser: User;
  get f() {
    return this.form.controls;
  }

  // Private
  private checkoutStepper: Stepper;

  constructor(
    private _cartService: CartService,
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
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
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));

    this.form = this._formBuilder.group({
      name: [this.currentUser.firstName + ' ' + this.currentUser.lastName, [Validators.required]],
      number: [this.currentUser.number, [Validators.required]],
      address: [this.currentUser.address, [Validators.required]],
      country: [this.currentUser.country, [Validators.required]],
      city: [this.currentUser.city, [Validators.required]],
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
