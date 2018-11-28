import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './common/login/login.component';
import {DefaultComponent} from './layout/default/default.component';
import {TrainingComponent} from './layout/training/training.component';
import {PageNoFoundComponent} from './common/page-no-found/page-no-found.component';
import {RxjsModule} from './components/rxjs/rxjs.module';
import {RxjsComponent} from './layout/rxjs/rxjs.component';
import {ThreeComponent} from './layout/three/three.component';
import {IndexComponent} from './common/index/index.component';

const pagesRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'd',
        component: DefaultComponent,
        loadChildren: './components/main/main.module#MainModule',
    },
    {
        path: 't',
        component: TrainingComponent,
        loadChildren: './components/hero/hero.module#HeroModule',
    },
    {
        path: 'r',
        component: RxjsComponent,
        loadChildren: './components/rxjs/rxjs.module#RxjsModule',
    },
    {
        path: 'three',
        component: ThreeComponent,
        loadChildren: './components/three-js/three-js.module#ThreeJsModule',
    },
    {
        path: 'canvas',
        loadChildren: './components/canvas/canvas.module#CanvasModule',
    },
    {
        path: 'todo',
        component: DefaultComponent,
        loadChildren: './components/to-do/to-do.module#ToDoModule'
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

export class PagesRoutingModule {
}
