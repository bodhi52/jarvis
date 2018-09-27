import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiUntilService {
    constructor(
        private http: HttpClient,
    ) {
    }
    
    /**
     * 暴露给外部的方法-get请求
     * @param url
     * @param params
     */
    public get(url, params?) {
        return this.requestMethod(url, 'get', params);
    }
    
    /**
     * 暴露给外部的方法-post请求
     * @param url
     * @param params
     */
    public post(url, params?) {
        return this.requestMethod(url, 'post', params);
    }
    /**
     * 发送请求
     * @param url
     * @param method
     * @param params
     */
    private requestMethod(url, method, params?) {
        let resultObs = null;
        switch (method) {
            case 'get':
                resultObs = this.http.get(url, {
                    responseType: 'json',
                    params: params,
                    withCredentials: true,
                }).pipe(
                    catchError(this.handleError)
                );
                break;
            case 'post':
                resultObs = this.http.post(url, params, {
                    withCredentials: true,
                }).pipe(
                    catchError(this.handleError)
                );
                break;
        }
        return resultObs;
    }
    
    /**
     * 处理错误
     * @param error
     */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.log('客户端错误', error.error.message);
        } else {
            console.log(`后端错误
            错误码为：${error.status}
            错误消息：${error.message}`
            );
        }
        return throwError('系统异常，请重试');
    }
}
