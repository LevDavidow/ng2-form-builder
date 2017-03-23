import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';

@Injectable()
export class VimeoService {
  private strorage: {
    [id: string]: string
  } = {}

  constructor(private http: Http) {}

  private processData(id: string, res) {
    const thumbanil = res.json()[0].thumbnail_large;
    this.strorage[id] = thumbanil;
    return thumbanil;
  }

  public getThumbnail(id) {
    return this.strorage[id] ? Observable.of(this.strorage[id]) : this.http
      .get(`http://vimeo.com/api/v2/video/${id}.json`)
      .map((res) => {
        return this.processData(id, res);
      })
  }
}
