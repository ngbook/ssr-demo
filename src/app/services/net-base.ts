/**
 * author: jsongo
 * desc: angular 请求模块的基类，建一个新的请求时，继承它就可以调用 get/post 等方法
 */
import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpResponse,
    HttpErrorResponse,
    HttpEvent,
    HttpResponseBase,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
// 添加 MD5 库后，编译出的 main.js（压缩）多6k而已，gzip会更小
import { Md5 } from 'ts-md5/dist/md5';
import { makeStateKey, TransferState, StateKey } from '@angular/platform-browser';
import { PlatformService } from '../platform/platform.service';

const API_BASE_URL = 'https://api.ngbook.net/';

export interface Response {
    code: number;
    data?: any;
    msg?: string; // additional message
}

export interface HttpResult {
    body: Response;
    opts?: Partial<HttpResponseBase>;
}

@Injectable()
export class RequestBase {

    constructor(
        protected http: HttpClient,
        private platform: PlatformService,
        private transferState: TransferState
    ) { }

    /**
     * Post 请求
     */
    protected post(urlWithoutDomain: string,
        data?: any): Observable<HttpResult> {
        const url = API_BASE_URL + urlWithoutDomain;
        return this.makeRequest('post', url, data);
    }

    /**
     * Get 请求
     */
    protected get(urlWithoutDomain: string,
        params: string | Object = ''): Observable<HttpResult> {
        if (typeof params === 'object') {
            params = this.obj2urlParam(params);
        }
        const url = API_BASE_URL + urlWithoutDomain + '?' + params;
        return this.makeRequest('get', url);
    }

    /**
     * 创建真正的请求，并发送
     */
    private makeRequest(
        reqMethod: string,
        url: string, data?: any
    ): Observable<HttpResult> {
        // server state
        let keyStr = `reqMethod+${url}+`;
        if (reqMethod === 'post' && data) {
            keyStr += JSON.stringify(data);
        }
        const md5 = Md5.hashStr(keyStr).toString().substr(12, 8);
        const stateKey = makeStateKey<any>(md5);
        const body = this.transferState.get(stateKey, null);
        // console.log(stateKey);
        if (this.platform.isBrowser && body) {
            return of(body);
        }

        const options: any = {
            observe: 'response',
            headers: {}
        };
        let observe: Observable<HttpEvent<Response>>;
        if (reqMethod === 'post') {
            options.headers['Content-Type'] = 'application/json';
            observe = this.http.post<Response>(
                url, data, options);
        } else { // 默认用get请求
            observe = this.http.get<Response>(
                url, options);
        }

        return observe
            .map<HttpEvent<Response>, HttpResult>(
                (rsp: HttpResponse<Response>) => {
                    return this.processRsp(rsp, stateKey);
                })
            .catch(error => this.handleError(error, stateKey));
    }

    /**
     * 处理异常
     */
    private handleError(error: HttpErrorResponse,
        stateKey: StateKey<any>): Observable<HttpResult> {
        if (error.error instanceof ErrorEvent) {
            // 网络错误，或浏览器引起的错误（不包含跨域）
            console.error('发生网络异常...', error.error.message);
            return of<HttpResult>({
                body: {
                    code: 1001,
                    data: {
                        status: error.status,
                    },
                    // 通过statusText返回的信息
                    msg: error.statusText
                }
            });
        } else { // 服务端返回的错误
            // 返回的 body 里可能有相关的信息
            console.error(`服务端返回错误码： ${error.status}`);
            const body = error.error;
            if (body && body.code) { // 进入这里，body.code 还为0的话那就是服务端的问题了，这种情况不处理
                const {
                    headers, status, statusText, url
                } = error;
                return of<HttpResult>(
                    this.processRsp(
                        new HttpResponse<Response>({
                            body,
                            headers, status, statusText, url
                        }), stateKey
                    )
                );
            }
        }
    }

    private processRsp(rsp: HttpResponse<Response>,
        stateKey: StateKey<any>): HttpResult {
        // console.log('- 处理返回 -', rsp);
        const { body, ...opts } = rsp;
        const code = body && body.code;
        // 对共同code做处理
        // case里如果没必要做下一步处理的，直接return就行
        switch (code) {
            case 1001: // 未知错误
                console.log('...未知错误');
                break;
            case 1005: // token已过期
                // 提示错误，可能还要跳到登录页
                break;
            // ... other cases
            default:
                // default handler...
                break;
        }
        const result = { body, opts };
        this.transferState.set(stateKey, result);
        return result;
    }

    private obj2urlParam(data: Object): string {
        return Object.keys(data).map((key) => {
            return encodeURIComponent(key) + '='
                + encodeURIComponent(data[key]);
        }).join('&');
    }
}
