import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesComponent} from './messages/messages.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
    ],
    exports: [
        MessagesComponent,
    ],
    declarations: [MessagesComponent]
})
export class ModalModule {
}
