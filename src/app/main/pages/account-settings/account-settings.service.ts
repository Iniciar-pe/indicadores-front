import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class AccountSettingsService {

    constructor(private _http: HttpClient) {}

    options = {
      headers: new HttpHeaders({
        'Accept': 'aplication/json'
      })
    }
    
    add(data: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/business/add`, data);
    }

    edit(data: any) {
      return this._http.put<any>(`${environment.apiUrl}/api/business/edit`, data);
    }

    deletePlan(data: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/business/delete`, data);
    }

    getUser() {
      return this._http.get<any>(`${environment.apiUrl}/api/auth/me`);
    }

    addLicenses(data: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/licenses/add`, data);
    }

    editLicenses(data: any) {
      return this._http.put<any>(`${environment.apiUrl}/api/licenses/edit`, data);
    }

    deleteLicense(data: any){
      return this._http.post<any>(`${environment.apiUrl}/api/licenses/delete`, data);
    }

    infoPlan(){
      return this._http.get<any>(`${environment.apiUrl}/api/master/get-licenses`);
    }

    editUser(user: any) {
      return this._http.put<any>(`${environment.apiUrl}/api/auth/edit`, user);
    }

    editPassword(user: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/auth/updatePassword`, user);
    }

    uploadImage(file: any) {
      return this._http.post<any>(`${environment.apiUrl}/api/auth/upload-image`, file, this.options);
    }
  
}
