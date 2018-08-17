import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {ApiUntilService} from './core/api/api-until.service';
import {ApiInterceptor} from './core/api/api-interceptor';
import {PagesRoutingModule} from './pages/pages-routing.module';
import {PagesModule} from './pages/pages.module';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        RouterModule,
        PagesModule,
        PagesRoutingModule,
    ],
    providers: [
        //
        ApiUntilService,
        // 应用拦截器
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        },
        {
            provide: NZ_I18N,
            useValue: zh_CN
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
