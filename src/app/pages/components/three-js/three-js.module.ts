import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CubeComponent} from './cube/cube.component';
import {RouterModule, Routes} from '@angular/router';
import {LineComponent} from './line/line.component';
import {EarthComponent} from './earth/earth.component';
import {ThreeDimensionalSceneComponent} from './three-dimensional-scene/three-dimensional-scene.component';
import {GeometryShapeComponent} from './geometry-shape/geometry-shape.component';
import {SceneComponent} from './scene/scene.component';
import {R1DemoComponent} from './r1-demo/r1-demo.component';
import { GeoComponent } from './geo/geo.component';
import { TextComponent } from './text/text.component';
import { ParticleComponent } from './particle/particle.component';
import { AviatorComponent } from './aviator/aviator.component';

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
        path: '3d-scene',
        component: ThreeDimensionalSceneComponent,
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
        path: 'r1-demo',
        component: R1DemoComponent,
    },
    {
        path: 'geo',
        component: GeoComponent,
    },
    {
        path: 'text',
        component: TextComponent,
    },
    {
        path: 'particle',
        component: ParticleComponent,
    },
    {
        path: 'aviator',
        component: AviatorComponent,
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
    declarations: [
        CubeComponent,
        LineComponent,
        EarthComponent,
        ThreeDimensionalSceneComponent,
        GeometryShapeComponent,
        SceneComponent,
        R1DemoComponent,
        GeoComponent,
        TextComponent,
        ParticleComponent,
        AviatorComponent,
    ]
})
export class ThreeJsModule {
}
