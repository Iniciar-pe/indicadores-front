import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { User } from 'app/auth/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/auth/service';
import { CartService } from 'app/layout/components/navbar/cart.service';
import Stepper from 'bs-stepper';
import { Cart } from '../../../../layout/components/navbar/ecommerce.model';
import moment from 'moment';
import { PagoProvider } from '../pago';
import Swal from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

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
  public cart: any;
  public iPay = true;
  @ViewChild('saveSwal') private saveSwal: SwalComponent;

  get f() {
    return this.form.controls;
  }

  get loading() {
    return this.pago.loading;
  }

  get iPayCard() {
    return this.pago.iPayCard;
  }

  set iPayCard(iPayCard) {
    this.pago.iPayCard = iPayCard;
  }

  get getTotal() {
    return this.pago.total;
  }

  get productsCart() {
    return this.products.filter(item => item.isInCart === true)?.length;
  }

  // Private
  private checkoutStepper: Stepper;

  constructor(
    private _cartService: CartService,
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private pago: PagoProvider
    ) {
      this.pago.iPayCard = true;
    }

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
    this.pago.initCulqi();
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));

    this.form = this._formBuilder.group({
      name: [this.currentUser.firstName + ' ' + this.currentUser.lastName, [Validators.required]],
      number: [this.currentUser.number, [Validators.required]],
      address: [this.currentUser.address, [Validators.required]],
      country: [this.currentUser.country, [Validators.required]],
      city: [this.currentUser.city, [Validators.required]],
      code: [this.currentUser.code, [Validators.required]]
    });


    this.checkoutStepper = new Stepper(document.querySelector('#checkoutStepper'), {
      linear: false,
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

  openCheckout () {
    const now = moment();

    this.cart = {
      name: this.f.name.value,
      phone: this.f.number.value,
      address: this.f.address.value,
      country: this.f.country.value,
      city: this.f.city.value,
      code: this.f.code.value,
      date: now.format('YYYY-MM-DD'),
      hour: now.format('HH:mm:ss'),
      total: this.totalCalculate(),
      method: this.card,
      response: '',
      detail: JSON.stringify(this._cartService._products.filter(e => e.isInCart === true))
    };


    if (this.card === '1') {
      this.pago.cfgFormulario(this.cart, Number(this.totalCalculate().replace('.', '')));
      this.pago.open();
    } else {
      this.saveSwal.fire();
    }

  }

  addCartToBackend() {
    this.pago.loading = true;
    this.pago.addCartToBackend(this.cart).subscribe(response => {
      this.pago.total = response.total;
      this.pago.loading = false;
      this._cartService.finallyCart();
      this.iPay = false;
      this.pago.linear = true;
      // this.checkoutStepper.to
    }, err => {
      this.pago.loading = false;
      this._cartService.finallyCart();
    });
  }

}
