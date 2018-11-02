import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CubeComponent} from './cube/cube.component';
import {RouterModule, Routes} from '@angular/router';
import { LineComponent } from './line/line.component';

const routes: Routes = [
    {
        path: 'cube',
        component: CubeComponent,
    },
    {
        path: 'line',
        component: LineComponent,
    },
    {
        path: '',
        redirectTo: 'cube',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [CubeComponent, LineComponent]
})
export class ThreeJsModule {
}
