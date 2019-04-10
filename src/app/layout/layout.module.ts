import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolBoxComponent} from './tool-box/tool-box.component';
import {ThreeComponent} from './three/three.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {DefaultComponent} from './default/default.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {ComponentsModule} from '../components/components.module';

@NgModule({
    declarations: [
        ToolBoxComponent,
        ThreeComponent,
        RxjsComponent,
        DefaultComponent,
    ],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        RouterModule,
        ComponentsModule,
    ]
})
export class LayoutModule {
}
