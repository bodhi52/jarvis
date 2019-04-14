import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from './modal/modal.module';
import {HighLightDirective} from './core/directive/high-light.directive';
import {LimitInputDirective} from './core/directive/limit-input.directive';
import {TimePipe} from './core/pipe/time.pipe';
import {CreatedTimePipe} from './core/pipe/created-time.pipe';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ModalModule,
    ],
    declarations: [
        HighLightDirective,
        LimitInputDirective,
        TimePipe,
        CreatedTimePipe,
    ],
    exports: [
        ReactiveFormsModule,
        HighLightDirective,
        LimitInputDirective,
        TimePipe,
        CreatedTimePipe,
    ]
})
export class ShareModule {

}
