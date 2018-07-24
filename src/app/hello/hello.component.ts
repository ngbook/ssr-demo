import { Component, OnInit } from '@angular/core';
import { PlatformService } from '../platform/platform.service';

@Component({
    selector: 'hello',
    templateUrl: './hello.component.html',
    styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
    title = 'hello';
    cookie = '';
    url = '';

    constructor(private platform: PlatformService) { }

    ngOnInit() {
        this.title = this.platform.isBrowser ? '客户端' : '服务端';
        if (this.platform.isBrowser) {
            // 使用 document 对象
            this.cookie = this.platform.document.cookie;
            // 使用 window 对象
            this.url = this.platform.window.location;
        }
    }

}
