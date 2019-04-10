import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {ApiInterceptor} from './core/api/api-interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app-routing.module';
import {IndependenceModule} from './pages/independence/independence.module';
import {LayoutModule} from './layout/layout.module';

registerLocaleData(zh);

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            }
        }),
        RouterModule,
        AppRoutingModule,
        LayoutModule,
        IndependenceModule,
    ],
    providers: [
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
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
