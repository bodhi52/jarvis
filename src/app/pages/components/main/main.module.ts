import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {PageNoFoundComponent} from '../../common/page-no-found/page-no-found.component';

const mainRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: '404',
        component: PageNoFoundComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(mainRoutes),
        NgZorroAntdModule,
    ],
    declarations: [DashboardComponent]
})
export class MainModule {
}
