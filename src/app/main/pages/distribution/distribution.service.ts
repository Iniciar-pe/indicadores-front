import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class DistributionService {

  constructor(private _httpClient: HttpClient) {

  }

  get(type) {
    if (type === '2') {
      type = type + ',3';
    }
    return this._httpClient.get<any>(`${environment.apiUrl}/api/licenses/get?type=${type}`);
  }

  add(data) {
    return this._httpClient.post<any>(`${environment.apiUrl}/api/licenses/add`, data);
  }

  getBusiness(type: string) {
    if (type === '2') {
      type = type + ',3';
    }
    return this._httpClient.get<any>(`${environment.apiUrl}/api/business/get-business-type?type=${type}`);
  }

  getGroup() {
    return this._httpClient.get<any>(`${environment.apiUrl}/api/licenses/get-group`);
  }

  addBusiness(data: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}/api/business/add`, data);
  }

  editBusiness(data: any) {
    return this._httpClient.put<any>(`${environment.apiUrl}/api/business/edit`, data);
  }

  getListBusiness(user) {
    return this._httpClient.get<any>(`${environment.apiUrl}/api/licenses/get-list?user=${user}`);
  }

  editLicenses(data: any) {
    return this._httpClient.put<any>(`${environment.apiUrl}/api/licenses/edit`, data);
  }

  addLicenses(data: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}/api/licenses/add`, data);
  }

  deleteBusiness(data: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}/api/business/delete`, data);
  }

}
