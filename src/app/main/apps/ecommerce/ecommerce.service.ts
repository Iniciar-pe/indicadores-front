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

    addPlanes(data) {
      return this._http.post<any>(`${environment.apiUrl}/api/ecommerce/add`, data);
    }
}
