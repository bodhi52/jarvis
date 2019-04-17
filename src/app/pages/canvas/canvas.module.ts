import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SinCosComponent } from './sin-cos/sin-cos.component';
import {RouterModule, Routes} from '@angular/router';

const router: Routes = [
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
    declarations: [SinCosComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(router),
    ]
})
export class CanvasModule {
}
