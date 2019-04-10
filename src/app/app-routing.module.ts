import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/independence/login/login.component';
import {PageNoFoundComponent} from './pages/independence/page-no-found/page-no-found.component';
import {IndexComponent} from './pages/independence/index/index.component';
import {ToolBoxComponent} from './layout/tool-box/tool-box.component';
import {DefaultComponent} from './layout/default/default.component';

const pagesRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'd',
        component: DefaultComponent,
        loadChildren: './pages/main/main.module#MainModule',
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
        path: 'todo',
        loadChildren: './pages/to-do/to-do.module#ToDoModule'
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
        path: '',
        component: IndexComponent,
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
