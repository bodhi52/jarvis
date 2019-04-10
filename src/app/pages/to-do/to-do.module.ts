import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ShareModule} from '../../share.module';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

const routes: Routes = [
    {
        path: '',
        component: ToDoListComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ShareModule,
        NgZorroAntdModule,
        RouterModule.forChild(routes),
    ],
    declarations: [ToDoListComponent]
})
export class ToDoModule {
}
