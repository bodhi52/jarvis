import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstComponent} from './first/first.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNoFoundComponent} from '../../common/page-no-found/page-no-found.component';
import {ShareModule} from '../../share.module';
import { DragDropComponent } from './drag-drop/drag-drop.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'first',
        pathMatch: 'full',
    },
    {
        path: 'first',
        component: FirstComponent,
    },
    {
        path: 'drag',
        component: DragDropComponent,
    },
    {
        path: '404',
        component: PageNoFoundComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        FirstComponent,
        DragDropComponent,
    ]
})
export class RxjsModule {
}
