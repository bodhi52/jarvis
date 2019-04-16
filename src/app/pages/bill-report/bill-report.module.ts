import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlipayComponent} from './alipay/alipay.component';
import {WxpayComponent} from './wxpay/wxpay.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'wxpay',
        component: WxpayComponent,
    },
    {
        path: 'alipay',
        component: AlipayComponent,
    },
    {
        path: '',
        redirectTo: 'wxpay',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [AlipayComponent, WxpayComponent]
})
export class BillReportModule {
}
