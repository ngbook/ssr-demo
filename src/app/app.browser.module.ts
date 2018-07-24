import { NgModule } from '@angular/core';
import {
    BrowserModule,
    BrowserTransferStateModule
} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    bootstrap: [AppComponent],

    imports: [
        BrowserModule.withServerTransition({ appId: 'app-root' }),
        BrowserTransferStateModule,

        AppModule,

    ]
})
export class AppBrowserModule { }
