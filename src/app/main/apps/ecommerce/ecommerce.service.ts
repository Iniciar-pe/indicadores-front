import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Plan } from './ecommerce.model';


@Injectable()
export class EcommerceService {

    public planesList: Plan[];
    constructor(private _http: HttpClient) {}

    getPlanes() {
      return this._http.get<any>(`${environment.apiUrl}/api/ecommerce/get-planes`);
    }

}
