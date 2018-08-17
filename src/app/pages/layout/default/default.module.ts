import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultComponent} from './default.component';
import {DefaultRoutingModule} from './default-routing.module';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        DefaultRoutingModule,
    ],
    declarations: [
        DefaultComponent,
    ]
})
export class DefaultModule {
}
