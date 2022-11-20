import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';


@Injectable()
export class UserService {

   /**
   *
   * @param {HttpClient} _http
   */
    constructor(private _http: HttpClient) {}

    /**
     * Get all users
     */
    getAll() {
      return this._http.get(`${environment.apiUrl}/api/auth/list-users`);
    }

    getById(id: number) {
      return this._http.get(`${environment.apiUrl}/api/plan/add/${id}`);
    }

    getUserAll(user: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/auth/list-users-u`, user);
    }

    activateUser(user: any) {
      return this._http.put<any>(`${environment.apiUrl}/api/auth/activate-user`, user);
    }

    edit(plan: any) {
      return this._http.put<any>(`${environment.apiUrl}/api/plan/edit`, plan);
    }

    
    
    deletePlan(plan: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/plan/delete`, plan);
    }
  
}
