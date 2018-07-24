import {
    Component,
    OnInit,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FruitsService } from './services/fruits.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    fruits$: Observable<any>;
    constructor(
        private fruit: FruitsService,
    ) { }

    ngOnInit() {
        this.fruits$ = this.fruit.fetch('fruit');
    }
}
