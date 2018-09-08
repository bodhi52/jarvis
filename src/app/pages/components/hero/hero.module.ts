import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroListComponent} from './hero-list/hero-list.component';
import {Router, RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {ModalModule} from '../../../modal/modal.module';
import {MessagesComponent} from '../../../modal/messages/messages.component';
import {ShareModule} from '../../../share.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
    {
        path: 'list',
        component: HeroListComponent,
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
    declarations: [HeroListComponent, HeroDetailComponent,
    ],
    entryComponents: [MessagesComponent],
})
export class HeroModule {
}
