import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ValuesRequest } from 'app/main/pages/data-entry/data-entry.model';

@Injectable({
  providedIn:'root'
})
export class EntryOfValuesService {

    constructor(private _http: HttpClient) {}
    
    getValues() {
      return this._http.get<ValuesRequest>(`${environment.apiUrl}/api/entry-data/get-values`);
    }
  
}
