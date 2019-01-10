import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableSettingComponent} from './table-setting/table-setting.component';
import {RouterModule, Routes} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import { TableWidthComponent } from './table-width/table-width.component';

const routes: Routes = [
    {
        path: 'table-setting',
        component: TableSettingComponent,
    },
    {
        path: 'table-width',
        component: TableWidthComponent,
    },
    {
        path: '',
        redirectTo: 'table-setting',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        NgZorroAntdModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        TableSettingComponent,
        TableWidthComponent,
    ]
})
export class ToolBoxModule {
}
