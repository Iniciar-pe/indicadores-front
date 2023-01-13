import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Plan } from '../../../layout/components/navbar/ecommerce.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class EcommerceService {

    private onProductListChange = new BehaviorSubject<any>({});
    public onProductListChange$ = this.onProductListChange.asObservable();
    public planesList: Plan[];

    constructor(private _http: HttpClient) {
      this.onProductListChange = new BehaviorSubject({});
    }

    getPlanes() {
      return this._http.get<any>(`${environment.apiUrl}/api/ecommerce/get-planes`);
    }

    addProduct() {
      console.log("addProduct aqui", this.planesList)
      this.onProductListChange.next(this.planesList);
    }

    calculate(product) {
      const end = 9999999999;
      const price = this.planesList
        .filter(item => item.id === product.id)[0].period
        .filter(val => val.id === product.selectedPeriod)[0].range
        .filter(value => value.start <= product.mount && product.mount <= (value.end ? value.end : end))[0].price;
      return String(Number(Number(price) * product.mount).toFixed(2));
    }

    periodText(product) {
      return this.planesList
      .filter(item => item.id === product.id)[0].period
      .filter(val => val.id === product.selectedPeriod)[0].description;
    }

    removeFromCart(product) {
      this.planesList = this.planesList.map(item => {
        if (item.id === product.id) {
          item.isInCart = false;
        }
        return item;
      });
    }

    mount(value, product) {
      this.planesList = this.planesList.map(item => {
        if (item.id === product.id) {
          item.mount = value;
        }
        return item;
      });
    }

    inputChange(value, product) {
      this.planesList = this.planesList.map(item => {
        if (item.id === product.id) {
          item.selectedPeriod = value;
        }
        return item;
      });
    }

}
