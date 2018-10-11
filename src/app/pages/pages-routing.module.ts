import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './common/login/login.component';
import {DefaultComponent} from './layout/default/default.component';
import {TrainingComponent} from './layout/training/training.component';
import {PageNoFoundComponent} from './common/page-no-found/page-no-found.component';

const pagesRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'd',
        component: DefaultComponent,
        loadChildren: './components/main/main.module#MainModule',
    },
    {
        path: 't',
        component: TrainingComponent,
        loadChildren: './components/hero/hero.module#HeroModule',
    },
    {
        path: 'r',
        loadChildren: './components/rxjs/rxjs.module#RxjsModule',
    },
    {
        path: '404',
        component: PageNoFoundComponent,
    },
    {
        path: '',
        redirectTo: 't',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '/404',
    },
    
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
