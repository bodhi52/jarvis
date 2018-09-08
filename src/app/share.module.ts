import {NgModule} from '@angular/core';
import {HighLightDirective} from './directive/high-light.directive';

@NgModule({
    declarations: [HighLightDirective],
    exports: [HighLightDirective],
})
export class ShareModule {

}