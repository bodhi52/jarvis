import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './common/login/login.component';
import {DefaultComponent} from './layout/default/default.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TrainingComponent} from './layout/training/training.component';

const pagesRoutes: Routes = [
    {
        path: '',
        redirectTo: 't',
        pathMatch: 'prefix',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'd',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: {
                    breadcrumb: 'dashboard',
                }
            }
        ]
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
