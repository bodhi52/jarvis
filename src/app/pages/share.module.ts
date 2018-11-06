import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from '../modal/modal.module';
import {PageNoFoundComponent} from './common/page-no-found/page-no-found.component';
import {HighLightDirective} from '../core/directive/high-light.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ModalModule,
    ],
    declarations: [
        PageNoFoundComponent,
        HighLightDirective,
    ],
    exports: [
        HighLightDirective,
    ]
})
export class ShareModule {

}
