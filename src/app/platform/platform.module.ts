import { NgModule } from '@angular/core';
import { PlatformService } from './platform.service';
import { NgtUniversalModule } from '@ng-toolkit/universal';

@NgModule({
    imports: [ NgtUniversalModule ],
    providers: [ PlatformService ]
})
export class PlatformModule { }
