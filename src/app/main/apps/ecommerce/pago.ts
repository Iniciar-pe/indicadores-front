import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

declare let Culqi: any;

@Injectable()
export class PagoProvider {

  public loading = false;
  private cart: any;
  settings: any = {
    title: '',
    currency: '',
    description: '',
    amount: 0
  };

  constructor(
    private http: HttpClient,
    ) {
    document.addEventListener('payment_event', (token: any) => {

      if (token.detail === '') {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Hubo algunos problemas al intentar validar tu compra. Contáctanos para ayudarte.',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-danger'
          },
        });
        return;
      }
      const token_id = token.detail;
      const url = 'https://api.culqi.com/v2/charges';
      const headers = new HttpHeaders ()
        .set ('Content-Type', 'application/json')
        .set ('Authorization', 'Bearer sk_test_bv0ScKcjQpYzXqO9'); // Ingresa tu Private Key Aqui

      const body = JSON.stringify ({
        amount: this.settings.amount,
        currency_code: 'PEN',
        email: 'alainhuntt@gmail.com',
        source_id: token_id
      });

      this.http.post<any>(url, body, {headers: headers}).subscribe (
        response => {
          this.cart.response = JSON.stringify(response);
          this.addCartToBackend(this.cart).subscribe(res => {
            this.loading = false;
            Swal.fire({
              icon: 'success',
              title: response?.outcome.user_message,
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'btn btn-success'
              },
            });
          }, err => {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: '',
              text: 'Hubo algunos problemas al intentar validar tu compra. Contáctanos para ayudarte.',
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'btn btn-danger'
              },
            });
          });

        }, error => {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'Hubo algunos problemas al intentar validar tu compra. Contáctanos para ayudarte.',
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn btn-danger'
            },
          });
        });
    }, false);
  }

  initCulqi () {
    Culqi.publicKey = 'pk_test_XJ3xqflwBlS2cU8D';
  }

  cfgFormulario (cart: any, amount: number) {

    this.cart = cart;
    this.settings.title = 'Dr. RATE';
    this.settings.currency = 'PEN';
    this.settings.description = '';
    this.settings.amount = amount;

    Culqi.settings ({
      title: 'Dr. RATE',     // Nombre de la empresa
      currency: 'PEN',
      description: 'Pago de servicio',
      amount: amount
    });
  }

  open () {
    Culqi.open();
  }

  addCartToBackend(data) {
    return this.http.post<any>(`${environment.apiUrl}/api/ecommerce/add`, data);
  }
}
