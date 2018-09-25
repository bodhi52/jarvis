import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroListComponent} from './hero-list/hero-list.component';
import {Router, RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {ModalModule} from '../../../modal/modal.module';
import {MessagesComponent} from '../../../modal/messages/messages.component';
import {ShareModule} from '../../../share.module';
import {DashboardComponent} from './dashboard/dashboard.component';

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
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ModalModule,
        ShareModule,
    ],
    declarations: [
        HeroListComponent,
        HeroDetailComponent,
        DashboardComponent,
    ],
    entryComponents: [MessagesComponent],
})
export class HeroModule {
}
