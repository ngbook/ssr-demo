import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FruitsService } from './services/fruits.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        NgtUniversalModule,
        HttpClientModule,
    ],
    providers: [
        FruitsService
    ],
})
export class AppModule { }
