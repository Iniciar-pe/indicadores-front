import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Template, TemplateRequest } from './template.model';

@Injectable()
export class PlantillaService {

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
      return this._http.get<TemplateRequest>(`${environment.apiUrl}/api/template/get`);
    }

    getById(id: number) {
      return this._http.get<Template>(`${environment.apiUrl}/api/template/add/${id}`);
    }

    add(plan: any) {
      
      return this._http.post<any>(`${environment.apiUrl}/api/template/add`, plan, this.options);
    }

    edit(plan: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/template/edit`, plan, this.options);
    }

    deletePlan(plan: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/template/delete`, plan);
    }
  
}
