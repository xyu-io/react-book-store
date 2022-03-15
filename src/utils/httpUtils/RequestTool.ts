import HttpReq from './request.fun';

const Http = new HttpReq();

export async function getFetch(url:string, params:any) {
    return Http.getFetch(url, params);
}
export async function postFetch(url:string, params:any) {
    return Http.postFetch(url, params);
}