import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SayListComponent} from './say-list/say-list.component';
import {RouterModule, Routes} from '@angular/router';

const router: Routes = [
    {
        path: '',
        component: SayListComponent,
    },
];

@NgModule({
    declarations: [
        SayListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(router),
    ]
})
export class SaySayModule {
}
