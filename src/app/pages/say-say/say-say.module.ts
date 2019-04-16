import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SayListComponent} from './say-list/say-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ShareModule} from '../../share.module';
import { SayCreateComponent } from './say-create/say-create.component';
import {FormsModule} from '@angular/forms';

const router: Routes = [
    {
        path: '',
        component: SayListComponent,
    },
];

@NgModule({
    declarations: [
        SayListComponent,
        SayCreateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(router),
        NgZorroAntdModule,
        ShareModule,
    ]
})
export class SaySayModule {
}
