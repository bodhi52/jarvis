import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SinCosComponent } from './sin-cos/sin-cos.component';
import {RouterModule, Routes} from '@angular/router';
import {LineComponent} from './line/line.component';
import {BezierOneComponent} from './line/some-line/bezier-one.component';
import {BezierTwoComponent} from './line/some-line/bezier-two.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { BezierThreeComponent } from './line/some-line/bezier-three.component';

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
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(router),
        NgZorroAntdModule,
    ]
})
export class CanvasModule {
}
