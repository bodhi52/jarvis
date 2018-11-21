import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CubeComponent} from './cube/cube.component';
import {RouterModule, Routes} from '@angular/router';
import {LineComponent} from './line/line.component';
import {EarthComponent} from './earth/earth.component';
import {ThreeDimensionalSenceComponent} from './three-dimensional-sence/three-dimensional-sence.component';
import { GeometryShapeComponent } from './geometry-shape/geometry-shape.component';
import { SceneComponent } from './scene/scene.component';

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
        path: 'earth',
        component: EarthComponent,
    },
    {
        path: '3d-sence',
        component: ThreeDimensionalSenceComponent,
    },
    {
        path: 'scene',
        component: SceneComponent,
    },
    {
        path: 'geometry-shape',
        component: GeometryShapeComponent,
    },
    {
        path: '',
        redirectTo: 'earth',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [CubeComponent, LineComponent, EarthComponent, ThreeDimensionalSenceComponent, GeometryShapeComponent, SceneComponent]
})
export class ThreeJsModule {
}
