
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { WINDOW, LOCAL_STORAGE } from '@ng-toolkit/universal';
import { isPlatformServer, DOCUMENT } from '@angular/common';

@Injectable()
export class PlatformService {
    isBrowser = true;
    constructor(
        @Inject(WINDOW) public window: any,
        @Inject(DOCUMENT) public document: any,
        @Inject(LOCAL_STORAGE) public localStorage: any,
        @Inject(PLATFORM_ID) platformId: {},
    ) {
        if (isPlatformServer(platformId)) {
            this.isBrowser = false;
        }
    }
}
