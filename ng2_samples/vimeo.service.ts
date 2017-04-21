import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';

@Injectable()
export class VimeoService {
  private cache: {
    [id: string]: string
  } = {}

  constructor(private http: Http) {}

  private processData(id: string, res): string {
    this.cache[id] = res.json()[0].thumbnail_large;

    return this.cache[id];
  }

  private fetchThumbnail(id: string): Observable<string>  {
    return this.http
      .get(`http://vimeo.com/api/v2/video/${id}.json`)
      .map(res => this.processData(id, res));
  }

  public getThumbnail(id: string): Observable<string> {
    return this.cache[id] ? Observable.of(this.cache[id]) : this.fetchThumbnail(id);
  }
}
