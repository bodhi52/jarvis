import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableSettingComponent} from './table-setting/table-setting.component';
import {RouterModule, Routes} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path: 'table-setting',
        component: TableSettingComponent,
    },
    {
        path: '',
        redirectTo: 'table-setting',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [
        NgZorroAntdModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [TableSettingComponent]
})
export class ToolBoxModule {
}
