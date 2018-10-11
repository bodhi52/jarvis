import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from '../modal/modal.module';
import {PageNoFoundComponent} from './common/page-no-found/page-no-found.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ModalModule,
    ],
    declarations: [
        PageNoFoundComponent,
    ],
    exports: [
    
    ]
})
export class ShareModule {

}
