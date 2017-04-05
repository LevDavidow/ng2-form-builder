import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

//Принудительно синхронизировать баллы.
//

interface IFieldsStorage {
  [locale: string]: any
}

interface IFieldAdded {
  component: string;
  id: string;
}

interface IFieldUpdated {
  id: string;
  values: Object;
}

@Injectable()
export class FieldsStorageService {
  public fieldsOrder: string[] = [];
  public fieldsOrderChange: Subject<string[]> = new Subject();
  public fieldAdded: Subject<IFieldAdded> = new Subject();
  public fieldRemoved: Subject<string> = new Subject();
  public fieldUpdated: Subject<IFieldUpdated> = new Subject();


  constructor() {}
  
  setOrder(order: string[]) {
    this.fieldsOrder = order;
    this.notifyOrderUpdate();
  }

  addField(field: IFieldAdded) {
    this.fieldsOrder.push(field.id);
    this.fieldAdded.next(field);
    this.notifyOrderUpdate();
  }

  removeField(id) {
    this.fieldsOrder = this.fieldsOrder.filter(fieldId => fieldId !== id)
    this.fieldRemoved.next(id);
    this.notifyOrderUpdate();
  }

  updateField(conf: IFieldUpdated) {
    this.fieldUpdated.next(conf);
  }

  private notifyOrderUpdate(): void {
    this.fieldsOrderChange.next(this.fieldsOrder);
  }
}
