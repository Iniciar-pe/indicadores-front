import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ValuesRequest } from 'app/main/pages/data-entry/data-entry.model';

@Injectable({
  providedIn:'root'
})
export class GlosaaryTermsService {

    constructor(private _http: HttpClient) {}

    getValues(criterion, business) {
      return this._http.get<ValuesRequest>(`${environment.apiUrl}/api/entry-data/get-values?c=${criterion}&b=${business}`);
    }

    addValues(data) {
      return this._http.post<any>(`${environment.apiUrl}/api/entry-data/add-values`, data);
    }
}
