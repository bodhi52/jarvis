import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {SiderComponent} from './sider/sider.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    declarations: [
        FooterComponent,
        SiderComponent,
    ],
    exports: [
        FooterComponent,
        SiderComponent
    ],
    imports: [
        CommonModule,
        NgZorroAntdModule,
    ]
})
export class ComponentsModule {
}
