import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CubeComponent} from './cube/cube.component';
import {RouterModule, Routes} from '@angular/router';
import {LineComponent} from './line/line.component';
import {ThreeDimensionalSceneComponent} from './three-dimensional-scene/three-dimensional-scene.component';
import {GeometryShapeComponent} from './geometry-shape/geometry-shape.component';
import {SceneComponent} from './scene/scene.component';
import {R1DemoComponent} from './demo/r1-demo/r1-demo.component';
import { GeoComponent } from './geo/geo.component';
import { TextComponent } from './text/text.component';
import { ParticleComponent } from './particle-system/particle/particle.component';
import { AviatorComponent } from './aviator/aviator.component';
import { AirplaneComponent } from './airplane/airplane.component';
import { ChinaMapComponent } from './china-map/china-map.component';
import { EarthComponent } from './earth/earth.component';
import { EarthGeoComponent } from './demo/earth-geo/earth-geo.component';

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
        path: 'airplane',
        component: AirplaneComponent,
    },
    {
        path: 'china-map',
        component: ChinaMapComponent,
    },
    {
        path: 'earth',
        component: EarthComponent,
    },
    {
        path: 'earth-geo',
        component: EarthGeoComponent,
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
    declarations: [
        CubeComponent,
        LineComponent,
        ThreeDimensionalSceneComponent,
        GeometryShapeComponent,
        SceneComponent,
        R1DemoComponent,
        GeoComponent,
        TextComponent,
        ParticleComponent,
        AviatorComponent,
        AirplaneComponent,
        ChinaMapComponent,
        EarthComponent,
        EarthGeoComponent,
    ]
})
export class ThreeJsModule {
}
