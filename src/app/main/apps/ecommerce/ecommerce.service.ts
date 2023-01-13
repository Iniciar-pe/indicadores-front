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

    inputChange(value, product) {
      this.planesList = this.planesList.map(item => {
        if (item.id === product.id) {
          item.selectedPeriod = value;
        }
        return item;
      });
    }

}
