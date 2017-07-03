import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class InterviewService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getInterviews(): Observable<any> {
    return this.http.get('/api/interviews').map(res => res.json());
  }

  countInterviews(): Observable<any> {
    return this.http.get('/api/interviews/count').map(res => res.json());
  }

  addInterview(interview): Observable<any> {
    return this.http.post('/api/interviews', JSON.stringify(interview), this.options);
  }

  getInterview(id: string): Observable<any> {
    return this.http.get(`/api/interviews/${id}`).map(res => res.json());
  }

  getInterview2(interview): Observable<any> {
    return this.http.get(`/api/interviews/${interview._id}`).map(res => res.json());
  }

  editInterview(interview): Observable<any> {
    return this.http.put(`/api/interviews/${interview._id}`, JSON.stringify(interview), this.options);
  }

  deleteInterview(interview): Observable<any> {
    return this.http.delete(`/api/interviews/${interview._id}`, this.options);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
