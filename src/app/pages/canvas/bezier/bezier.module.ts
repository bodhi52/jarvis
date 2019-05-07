import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BasicComponent } from './basic/basic.component';
import {SegmentComponent} from './segment/segment.component';
import { BezierComponent } from './bezier.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        BasicComponent,
        SegmentComponent,
        BezierComponent,
    ],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        RouterModule,
    ]
})
export class BezierModule {
}
