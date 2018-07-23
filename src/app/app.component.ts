import { Component, OnInit } from '@angular/core';
import { FruitsService } from './fruits.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app';
    fruits: any;
    constructor(private fruit: FruitsService) { }

    ngOnInit() {
        this.fruits = this.fruit.fetch('fruit');
    }
}
