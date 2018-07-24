import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FruitsService } from './services/fruits.service';
import { PlatformModule } from './platform/platform.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        NgtUniversalModule,
        HttpClientModule,
        PlatformModule,
        AppRoutingModule,
    ],
    providers: [
        FruitsService
    ],
})
export class AppModule { }
