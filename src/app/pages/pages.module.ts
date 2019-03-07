import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './common/login/login.component';
import {DefaultComponent} from './layout/default/default.component';
import {RouterModule} from '@angular/router';
import {ModalModule} from '../modal/modal.module';
import {ShareModule} from './share.module';
import {RxjsComponent} from './layout/rxjs/rxjs.component';
import {SiderComponent} from './common/sider/sider.component';
import {ThreeComponent} from './layout/three/three.component';
import {IndexComponent} from './common/index/index.component';
import {ToolBoxComponent} from './layout/tool-box/tool-box.component';
import {FooterComponent} from './common/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        ModalModule,
    ],
    declarations: [
        IndexComponent,
        LoginComponent,
        FooterComponent,
        SiderComponent,
        DefaultComponent,
        RxjsComponent,
        ThreeComponent,
        ToolBoxComponent,
    ]
})
export class PagesModule {
}
