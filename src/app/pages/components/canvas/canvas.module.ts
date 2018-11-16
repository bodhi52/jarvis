import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SinCosComponent} from './sin-cos/sin-cos.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'sin-cos',
        component: SinCosComponent,
    },
    {
        path: '',
        redirectTo: 'sin-cos',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [SinCosComponent]
})
export class CanvasModule {
}
