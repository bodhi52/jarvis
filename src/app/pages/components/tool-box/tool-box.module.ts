import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableSettingComponent} from './table-setting/table-setting.component';
import {RouterModule, Routes} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import { TableWidthComponent } from './table-width/table-width.component';
import { TranslateGoogleDocComponent } from './translate-google-doc/translate-google-doc.component';

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
        path: 'translate-google-doc',
        component: TranslateGoogleDocComponent,
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
        TranslateGoogleDocComponent,
    ]
})
export class ToolBoxModule {
}
