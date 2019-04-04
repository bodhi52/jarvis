import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableSettingComponent} from './table-setting/table-setting.component';
import {RouterModule, Routes} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import { TableWidthComponent } from './table-width/table-width.component';
import { TranslateGoogleDocComponent } from './translate-google-doc/translate-google-doc.component';
import { GoogleDocTranslateComponent } from './google-doc-translate/google-doc-translate.component';
import { HighLevelComponent } from './translate-google-doc/high-level/high-level.component';
import { BasicLevelComponent } from './translate-google-doc/basic-level/basic-level.component';
import { BasicComponent } from './google-doc-translate/basic/basic.component';
import { HighComponent } from './google-doc-translate/high/high.component';

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
        path: 'google-doc-translate',
        component: GoogleDocTranslateComponent,
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
        GoogleDocTranslateComponent,
        HighLevelComponent,
        BasicLevelComponent,
        BasicComponent,
        HighComponent,
    ]
})
export class ToolBoxModule {
}
