import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BasicComponent } from './basic/basic.component';
import {SegmentComponent} from './segment/segment.component';

@NgModule({
    declarations: [
        BasicComponent,
        SegmentComponent,
    ],
    imports: [
        CommonModule,
    ]
})
export class BezierModule {
}
