import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {DefaultComponent} from './default.component';

const layoutRoutes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: 'd',
                component: DashboardComponent,
            }
        ],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(layoutRoutes),
    ],
    exports: [
        RouterModule,
    ]
})

export class DefaultRoutingModule {
}
