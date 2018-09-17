import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './common/login/login.component';
import {DefaultComponent} from './layout/default/default.component';
import {TrainingComponent} from './layout/training/training.component';

const pagesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'd',
        pathMatch: 'prefix',
    },
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
