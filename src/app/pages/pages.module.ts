import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './common/login/login.component';
import {DefaultComponent} from './layout/default/default.component';
import {RouterModule} from '@angular/router';
import {TrainingComponent} from './layout/training/training.component';
import {ModalModule} from '../modal/modal.module';
import { PageNoFoundComponent } from './common/page-no-found/page-no-found.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        ModalModule,
    ],
    declarations: [
        LoginComponent,
        DefaultComponent,
        TrainingComponent,
        PageNoFoundComponent,
    ]
})
export class PagesModule {
}
