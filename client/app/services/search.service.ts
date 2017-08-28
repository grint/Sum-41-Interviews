import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  doSearch(searchString): Observable<any> {
    console.log(searchString);
    return this.http.post('/api/search/'+searchString, this.options);
  }

  getResults(searchString): Observable<any> {
    console.log(searchString);
    return this.http.get('/api/search/'+searchString).map(res => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
