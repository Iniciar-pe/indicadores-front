import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { RequestRatios } from './ratio.model';
import { map } from 'rxjs/operators';

@Injectable()
export class RatioService {

    constructor(private _http: HttpClient) {}

    getRatios(data) {
      return this._http.post<RequestRatios>(`${environment.apiUrl}/api/ratios/get`, data);
    }

    addEntryData(data) {
      return this._http.post<any>(`${environment.apiUrl}/api/entry-data/add`, data);
    }

}
