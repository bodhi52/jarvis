import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroListComponent} from './hero-list/hero-list.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {ModalModule} from '../../../modal/modal.module';
import {MessagesComponent} from '../../../modal/messages/messages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import {PageNoFoundComponent} from '../../common/page-no-found/page-no-found.component';
import {ShareModule} from '../../share.module';
import { AnimationsComponent } from './animations/animations.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'list',
        component: HeroListComponent,
    },
    {
        path: 'detail/:id',
        component: HeroDetailComponent,
    },
    {
        path: 'animations',
        component: AnimationsComponent,
    },
    {
        path: 'reactive-form',
        component: ReactiveFormComponent,
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
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        ModalModule,
        ShareModule,
        HttpClientModule,
        NgZorroAntdModule,
    ],
    declarations: [
        HeroListComponent,
        HeroDetailComponent,
        DashboardComponent,
        AddHeroComponent,
        HeroSearchComponent,
        AnimationsComponent,
        ReactiveFormComponent,
    ],
    entryComponents: [MessagesComponent],
})
export class HeroModule {
}
