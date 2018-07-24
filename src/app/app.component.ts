import { Component, OnInit, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { FruitsService } from './services/fruits.service';
import { isPlatformServer } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    fruits: any;
    constructor(
        private fruit: FruitsService,
        @Optional() @Inject(PLATFORM_ID) private platformId: {} | null,
    ) { }
    title = isPlatformServer(this.platformId) ? '服务端' : '浏览器端';

    ngOnInit() {
        this.fruits = this.fruit.fetch('fruit');
    }
}
