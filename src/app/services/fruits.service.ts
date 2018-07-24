
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestBase } from './net-base';

@Injectable()
export class FruitsService extends RequestBase {

    fetch(url): Observable<any> {
        return this.post(url).map((rsp) => {
            return rsp.body;
        });
    }
}
