import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SinCosComponent } from './sin-cos/sin-cos.component';
import {RouterModule, Routes} from '@angular/router';
import {LineComponent} from './line/line.component';
import {BezierOneComponent} from './line/some-line/bezier-one.component';
import {BezierTwoComponent} from './line/some-line/bezier-two.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { BezierThreeComponent } from './line/some-line/bezier-three.component';
import { BezierFourComponent } from './line/some-line/bezier-four.component';
import {SegmentComponent} from './bezier/segment/segment.component';
import {BasicComponent} from './bezier/basic/basic.component';
import {BezierModule} from './bezier/bezier.module';

const router: Routes = [
    {
        path: 'sin-cos',
        component: SinCosComponent,
    },
    {
        path: 'line',
        component: LineComponent,
    },
    {
        path: 'bezier',
        children: [
            {
                path: '',
                redirectTo: 'basic',
            },
            {
                path: 'basic',
                component: BasicComponent,
            },
            {
                path: 'segment',
                component: SegmentComponent,
            },
        ]
    },
    {
        path: '',
        redirectTo: 'sin-cos',
        pathMatch: 'full',
    }
];

@NgModule({
    declarations: [
        SinCosComponent,
        LineComponent,
        BezierOneComponent,
        BezierTwoComponent,
        BezierThreeComponent,
        BezierFourComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(router),
        NgZorroAntdModule,
        BezierModule,
    ]
})
export class CanvasModule {
}
