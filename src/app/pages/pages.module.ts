import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './common/login/login.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
    ],
    declarations: [
        LoginComponent,
    ]
})
export class PagesModule {
}
