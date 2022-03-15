import React from "react";
// @ts-ignore
import qs from 'qs';

/**
 * @description: 枚举出请求数据格式类型
 * @param {type} 枚举类型
 * @return:
 */
enum ContentType {
    json = 'application/json;charset=UTF-8',
    form = 'application/x-www-form-urlencoded; charset=UTF-8'
}
/**
 * @description: 枚举request请求的method方法
 * @param {type} 枚举类型
 * @return:
 */
enum HttpMethod {
    get = 'GET',
    post = 'POST'
}
/**
 * @description: 声明请求头header的类型
 * @param {type}
 * @return:
 */
interface IHeader {
    Accept?: string;
    'Content-Type': string;
    [propName: string]: any;
}
/**
 * @description: 声明fetch请求参数配置
 * @param {type}
 * @return:
 */
interface IReqConfig {
    method?: string;
    credentials?: string;
    headers?: IHeader;
    body?:any;
}
interface IHttp {
    getFetch<R,P={}>(url: string, params?:P, options?:RequestInit): Promise<R>;
    postFetch<R,P={}>(url: string, params?:P): Promise<R>;
}
export default class HttpRequests implements IHttp {
    public handleUrl = (url: string) => (params:any):string => {
        if(params){
            let paramsArray: string[] = [];
            Object.keys(params).forEach((key) =>
                paramsArray.push(key + "=" + encodeURIComponent(params[key]))
            );
            if (url.search(/\?/) === -1) {
                typeof params === "object" ? (url += "?" + paramsArray.join("&")) : url;
            } else {
                url += "&" + paramsArray.join("&");
            }
        }
        return url;
    }

    public async getFetch<R, P={}>(url: string, params:P, options?:RequestInit):Promise<R>{
        options = {
            method: HttpMethod.get,
            credentials: 'include',
            headers: {
                'Content-Type': ContentType.json
            }
        };
        return await fetch(this.handleUrl(url)(params),options)
            .then<R>(((response:any) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response;
                }
            }))
    }
    public async postFetch<R, P={}>(url: string, params:any ):Promise<R> {
        console.log("请求参数",params);
        let options: RequestInit = {
            method: HttpMethod.post,
            credentials: 'include',
            headers: {
                'Content-Type': ContentType.json
            },
            body: JSON.stringify(params)
        };
        return await fetch(url, options)
            .then<R>(((response:any) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response;
                }
            }))
    }
}