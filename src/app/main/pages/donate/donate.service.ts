import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class DonateService {

  constructor(private _httpClient: HttpClient) {

  }

  get() {
    return this._httpClient.get<any>(`${environment.apiUrl}/api/donate/get`);
  }

}
