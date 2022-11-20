import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Rubro, RubroRequest } from './indicators.model';

@Injectable({
  providedIn:'root'
})
export class IndicatorsService {

   /**
   *
   * @param {HttpClient} _http
   */
    constructor(private _http: HttpClient) {}

    options = {
      headers: new HttpHeaders({
        'Accept': 'aplication/json'
      })
    }
    
    getAll() {
      return this._http.get<RubroRequest>(`${environment.apiUrl}/api/entry/get`);
    }

    getById(id: number) {
      return this._http.get<Rubro>(`${environment.apiUrl}/api/entry/add/${id}`);
    }

    add(entry: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/entry/add`, entry);
    }

    edit(entry: any) {
      return this._http.put<any>(`${environment.apiUrl}/api/entry/edit`, entry);
    }

    deleteEntry(entry: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/entry/delete`, entry);
    }

    getAllIndicator() {
      return this._http.get<any>(`${environment.apiUrl}/api/indicator/get`);
    }

    getByIdIndicator(id: number) {
      return this._http.get<Rubro>(`${environment.apiUrl}/api/indicator/add/${id}`);
    }

    addIndicator(indicator: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/indicator/add`, indicator, this.options);
    }

    editIndicator(indicator: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/indicator/edit`, indicator, this.options);
    }

    deleteEntryIndicator(indicator: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/indicator/delete`, indicator);
    }
  
}
