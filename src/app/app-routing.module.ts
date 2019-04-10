import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/independence/login/login.component';
import {PageNoFoundComponent} from './pages/independence/page-no-found/page-no-found.component';
import {ToolBoxComponent} from './layout/tool-box/tool-box.component';
import {DefaultComponent} from './layout/default/default.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                redirectTo: 'd',
                pathMatch: 'full',
            },
            {
                path: 'd',
                loadChildren: './pages/main/main.module#MainModule',
            },
            {
                path: 'todo',
                loadChildren: './pages/to-do/to-do.module#ToDoModule'
            },
            {
                path: 'say-say',
                loadChildren: './pages/say-say/say-say.module#SaySayModule',
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'bill-report',
        loadChildren: './pages/bill-report/bill-report.module#BillReportModule',
    },
    {
        path: 'three',
        loadChildren: './pages/three-js/three-js.module#ThreeJsModule',
    },
    
    {
        path: 'tool-box',
        component: ToolBoxComponent,
        loadChildren: './pages/tool-box/tool-box.module#ToolBoxModule'
    },
    {
        path: '404',
        component: PageNoFoundComponent,
    },
    {
        path: '**',
        redirectTo: '/404',
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(pagesRoutes),
    ],
    exports: [
        RouterModule,
    ]
})

export class AppRoutingModule {
}
