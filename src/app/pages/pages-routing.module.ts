import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './common/login/login.component';

const pagesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'prefix',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'd',
        loadChildren: './layout/default/default.module#DefaultModule',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(pagesRoutes),
    ],
    exports: [
        RouterModule,
    ]
})

export class PagesRoutingModule {
}
