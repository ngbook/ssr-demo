import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FruitsService } from './services/fruits.service';
import { HelloComponent } from './hello/hello.component';
import { PlatformModule } from './platform/platform.module';

@NgModule({
    declarations: [
        AppComponent,
        HelloComponent
    ],
    imports: [
        CommonModule,
        NgtUniversalModule,
        HttpClientModule,
        PlatformModule,
    ],
    providers: [
        FruitsService
    ],
})
export class AppModule { }
