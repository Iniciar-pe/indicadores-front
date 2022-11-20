import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Business, RequestBusiness } from './data-entry.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataEntryService {

    constructor(private _http: HttpClient) {}

    getEntryData() {
      return this._http.get(`${environment.apiUrl}/api/entry-data/get`);
    }

    addEntryData(data) {
      return this._http.post<any>(`${environment.apiUrl}/api/entry-data/add`, data);
    }

    getBusiness() {
      return this._http.get<RequestBusiness>(`${environment.apiUrl}/api/business/get-business`);
  }
  
}
