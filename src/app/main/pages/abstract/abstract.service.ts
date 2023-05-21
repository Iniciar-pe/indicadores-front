import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class AbstractService {

    constructor(private _http: HttpClient) {}

    runProcess() {
        return this._http.get<Blob>(`${environment.apiUrl}/api/word/get`, { observe: 'response', responseType: 'blob' as 'json' });
    }

}
