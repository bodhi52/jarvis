import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.code !== undefined) {
                        // 未登录
                        if (event.body.code === 2) {
                            // 未登录逻辑。
                        } else if (event.body.code === 1) {
                            // 不需要特意接收的错误。
                            console.log(event.body.msg);
                        }
                    }
                    
                }
            })
        );
    }
}
