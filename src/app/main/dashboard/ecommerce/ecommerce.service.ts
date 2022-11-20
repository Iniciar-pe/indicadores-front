import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class EcommerceService {

   /**
   *
   * @param {HttpClient} _http
   */
    constructor(private _http: HttpClient) {}

    getAll() {
        return this._http.get<any>(`${environment.apiUrl}/api/business/get-business`);
    }

  
}
