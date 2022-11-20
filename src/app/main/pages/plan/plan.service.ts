import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Plan, PlanRequest } from './plan.model';

@Injectable()
export class PlanService {

   /**
   *
   * @param {HttpClient} _http
   */
    constructor(private _http: HttpClient) {}

    /**
     * Get all users
     */
    getAll() {
      return this._http.get<PlanRequest>(`${environment.apiUrl}/api/plan/get`);
    }

    getById(id: number) {
      return this._http.get<Plan>(`${environment.apiUrl}/api/plan/add/${id}`);
    }

    add(plan: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/plan/add`, plan);
    }

    edit(plan: any) {
      return this._http.put<any>(`${environment.apiUrl}/api/plan/edit`, plan);
    }

    deletePlan(plan: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/plan/delete`, plan);
    }
  
}
