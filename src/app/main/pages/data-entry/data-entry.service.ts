import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Business, RequestBusiness } from './data-entry.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataEntryService {

    constructor(private _http: HttpClient) {}

    getEntryData(data) {
      return this._http.post(`${environment.apiUrl}/api/entry-data/get`, data);
    }

    addEntryData(data) {
      return this._http.post<any>(`${environment.apiUrl}/api/entry-data/add`, data);
    }

    getBusiness() {
      return this._http.get<RequestBusiness>(`${environment.apiUrl}/api/business/get-business`);
    }

    runProcess(data) {
      return this._http.post(`${environment.apiUrl}/api/entry-data/run`, data);
    }
  
}
