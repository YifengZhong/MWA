import {Http,Response,RequestOptions,Headers} from "@angular/http"
import { Injectable } from '@angular/core';

@Injectable()
export class HttpSrv {
    constructor(public http:Http){}
    getMyData() {
        return this.http.get('http://jsonplaceholder.typicode.com/users/1');
    }
    getPostData() {
        return this.http.get('http://jsonplaceholder.typicode.com/posts?userId=1');
    }
}