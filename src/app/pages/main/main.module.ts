import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ShareModule} from '../../share.module';

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
];

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        RouterModule.forChild(mainRoutes),
        NgZorroAntdModule,
    ],
    declarations: [DashboardComponent]
})
export class MainModule {
}
