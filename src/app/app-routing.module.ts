import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'hello',
        loadChildren: './hello/hello.module#HelloModule'
    }, {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
        })
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }
