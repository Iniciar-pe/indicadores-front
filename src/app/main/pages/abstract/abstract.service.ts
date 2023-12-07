import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class AbstractService {

    constructor(private _http: HttpClient) {}

    runProcess(id) {
        return this._http.get<Blob>(`${environment.apiUrl}/api/word/get?e=${id}`, { observe: 'response', responseType: 'blob' as 'json' });
    }

}
