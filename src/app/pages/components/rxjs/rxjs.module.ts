import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstComponent} from './first/first.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNoFoundComponent} from '../../common/page-no-found/page-no-found.component';
import {ShareModule} from '../../share.module';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SwitchMapComponent } from './switch-map/switch-map.component';

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
        path: 'switch-map',
        component: SwitchMapComponent,
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
        SwitchMapComponent,
    ]
})
export class RxjsModule {
}
