import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchESService {
  private esHost = 'http://ubuntu:9200';
  private header: HttpHeaders;
  constructor(private httpClient: HttpClient) { 
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json; utf-8');
    this.header.append('Accept-Encoding', 'gzip, deflated');
  }

  search(index: string, searchBody: Object): Observable<any> {
    console.log(index, searchBody);
    let endpoint = `${this.esHost}/${index}/_search`;
    return this.httpClient.post(endpoint, searchBody, {headers: this.header});
  }
}
