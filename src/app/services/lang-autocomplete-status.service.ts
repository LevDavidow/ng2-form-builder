import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ILangAutocompleteStatus {
  [lang: string]: boolean
}

@Injectable()
export class LangAutocompleteStatusService {
  private langAutocompleteStatus: ILangAutocompleteStatus = {};
  
  public langAutocompleteStatusChange: Subject<ILangAutocompleteStatus>;

  constructor() {
    this.langAutocompleteStatusChange = new Subject();
  }

  public viewAutocomplete(lang: string): void {
    this.langAutocompleteStatus[lang] = false;
    this.change();
  }

  public setAutocomplete(lang): void {
    this.langAutocompleteStatus[lang] = true;
    this.change();
  }

  public getAutocompletedLang(): string {
    const langs = Object
            .keys(this.langAutocompleteStatus)
            .filter((key: string) => !!this.langAutocompleteStatus[key])
    return langs.length ? langs[0] : '';
  }

  // public isAutocompletedLangsExist(): boolean {
  //   return Object
  //           .keys(this.langAutocompleteStatus)
  //           .map(key => this.langAutocompleteStatus[key])
  //           .reduce((res, item) => res || item, false);
  // }

  private change() {
    this.langAutocompleteStatusChange.next(this.langAutocompleteStatus)
  }

}
