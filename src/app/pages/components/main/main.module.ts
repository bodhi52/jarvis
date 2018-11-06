import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {PageNoFoundComponent} from '../../common/page-no-found/page-no-found.component';
import {ShareModule} from '../../share.module';
import { BillRecordComponent } from './bill-record/bill-record.component';

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
        path: 'bill-record',
        component: BillRecordComponent,
    },
    {
        path: '404',
        component: PageNoFoundComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        RouterModule.forChild(mainRoutes),
        NgZorroAntdModule,
    ],
    declarations: [DashboardComponent, BillRecordComponent]
})
export class MainModule {
}
