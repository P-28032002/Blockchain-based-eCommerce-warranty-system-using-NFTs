import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  public get(queryUrl: string, headers?: HttpHeaders, params?: HttpParams): any {
        try {
            return this.http.get(queryUrl, {
                observe: 'response', headers, params
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public post(queryUrl: string, requestBody: object, headers?: HttpHeaders, params?: HttpParams): any {
        try {
            return this.http.post(queryUrl, requestBody, {
                observe: 'response', headers, params
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
