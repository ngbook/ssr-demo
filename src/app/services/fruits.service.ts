
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';

import { RequestBase } from './net-base';
import { PlatformService } from '../platform/platform.service';

const FRUITS_KEY = makeStateKey<Object>('fruits');

@Injectable()
export class FruitsService extends RequestBase {
    constructor(
        http: HttpClient,
        private platform: PlatformService,
        private transferState: TransferState
    ) {
        super(http);
    }

    fetch(url): Observable<any> {
        const body = this.transferState.get(FRUITS_KEY, null);
        // console.log(body);
        if (this.platform.isBrowser && body) {
            return of(body);
        } else {
            return this.post(url).map((rsp) => {
                const _body = rsp.body;
                this.transferState.set(FRUITS_KEY, _body);
                return _body;
            });
        }
    }
}
