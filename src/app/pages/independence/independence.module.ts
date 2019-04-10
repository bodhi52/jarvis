import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {PageNoFoundComponent} from './page-no-found/page-no-found.component';
import {IndexComponent} from './index/index.component';
import {ShareModule} from '../../share.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        LoginComponent,
        PageNoFoundComponent,
        IndexComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ShareModule,
        NgZorroAntdModule,
    ]
})
export class IndependenceModule {
}
