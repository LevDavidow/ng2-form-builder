import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';

import { FieldsStorageService } from './fields-storage.service'

import { FieldHooksService } from './field-hooks.service'

import { PersistanceValidationService } from './persistance-validation.service';

import { Field, FieldsById } from '../models';

import { FieldComponentName } from '../consts'

import FieldsBuilder from '../fields.builder';

import { PersistentFields } from '../field.persistence.strategy';

import { LangAutocompleteStatusService, ILangAutocompleteStatus } from './lang-autocomplete-status.service'


import { 
  fieldsById,
  fieldsOrder,
  fieldsConfig
} from '../fields.mocks'

interface FieldName {
  name: FieldComponentName,
  trivialName: string
}

interface FieldsChange {
  fields: FieldsById,
  order: string[]
}

@Injectable()
export class FieldsService {
  public fieldsChange: BehaviorSubject<FieldsChange>;
  public previewChange: BehaviorSubject<boolean>;
  public fieldChange: BehaviorSubject<String>  = new BehaviorSubject('');
  public fieldCountChange: Subject<FieldComponentName> = new Subject();

  public fieldNames: FieldName[];

  public inited: Subject<string> = new Subject();

  public fieldsById: FieldsById = {};
  public fieldsOrder: string[] = [];


  private config: any = fieldsConfig;
  private persist: PersistentFields;
  private locale: string;


  constructor(
    private validation: PersistanceValidationService, 
    private sharedFields: FieldsStorageService,
    private autocompleted: LangAutocompleteStatusService
  ) {
    this.sharedFields.fieldAdded.subscribe(this.fieldAdded.bind(this));

    this.sharedFields.fieldsOrderChange.subscribe(this.orderChanged.bind(this));

    this.sharedFields.fieldRemoved.subscribe(this.fieldRemoved.bind(this));

    this.sharedFields.fieldUpdated.subscribe(this.fieldUpdated.bind(this));
  }

  get fieldsByIdArray() {
    return Object.keys(this.fieldsById).map(id => this.fieldsById[id]);
  }

  public init(config) {
    this.config = config;
    this.applyConfig();
    this.inited.next('done');
  }

  private applyConfig(): void {
    this.persist = new PersistentFields(this.config.config.persist, this.validation);
    
    this.locale = this.config.config.persist.name;

    this.fieldNames = Object
      .keys(this.config.dynamicFields)
      .map((name: FieldComponentName) => {
        return {
          name: name,
          trivialName: this.config.dynamicFields[name]['trivialName']
        }
      });
    
    this.fieldsChange = new BehaviorSubject({
      fields: this.fieldsById, 
      order: this.fieldsOrder
    }); 

    if (this.config.staticFields) {
      this.fieldsById = Object.assign(
        {}, 
        this.fieldsById, 
        Object
          .keys(this.config.staticFields)
          .map(id => this.createStaticField(id))
          .reduce((result, field) => {
            result[field.id] = field;
            return result;
          }, {})
      )
    }
    

    this.persist.load().then(() => {
      
      this.fieldsById = Object.assign({}, this.fieldsById,
        this
        .persist
        .getValues()
        .reduce((result: any, field: Field) => {

          if (field.static) {
            result[field.id] = this.createStaticField(
              field.id, 
              field.values,
              field.touched
            )
          } else {
            result[field.id] = this.createField(
              field.component, 
              field.id, 
              field.values,
              field.touched
            )
          }
          return result;
        }, {})
      );

      this.fieldsOrder = this.persist.getOrder();

    }).then(() => {
      this.notifyFieldsChange();
    }).then(() => {
      this.validation.check(this.fieldsById, (<string>this.locale))
    })
    
  }

  private save() {
    
    this.validation.check(this.fieldsById, (<string>this.locale));

    this.persist.save(this.fieldsById, this.fieldsOrder);
  }

  private generateUID(): string {
    let i, random;
    let result = '';

    for (i = 0; i < 10; i++) {
        random = Math.random() * 16 | 0;
        result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }

    return result;
  }
  
  getFieldValues(id: string) {
    return this.fieldsById[id].values
  }

  updateFields($fields): void {
    this.sharedFields.setOrder($fields.map(field => field.id))
  }

  updateField(id: string, values: Object): void {
    const target = this.fieldsById[id];

    target.touched = true;

    if (this.validation.isFieldNotEmpty(target) || target.touched) {
      target['values'] = values;
    }
    
    this.sharedFields.updateField({
      id,
      values
    });

    this.notifyFieldChange(id);
  }

  removeField(id: string): void {
    this.sharedFields.removeField(id);
  }

  private fieldAdded(config) {
    const target = this.createField(
      config.component, config.id
    );
    this.fieldsById[config.id] = target;
    
    this.notifyFieldsChange();
    this.notifyFieldCountChange(target.component);
  }


  private fieldUpdated(config) {
    const target: Field = this.fieldsById[config.id];
    
    const forceSyncValues = target.config &&  target.config.forceSync &&
      target.config.forceSync.reduce((shouldUpdate, key) => {
        shouldUpdate = shouldUpdate || target.values[key] !== config.values[key];
        return shouldUpdate
      }, false);

   

    if (!target.touched || forceSyncValues) {
      target['values'] = config.values;
      this.notifyFieldChange(config.id);
      this.autocompleted.setAutocomplete(this.locale);
    }
  }
  

  private orderChanged(order: string[]) {
    this.fieldsOrder = order;
    this.notifyFieldsChange();
  }

  private fieldRemoved(id) {
    const component = this.fieldsById[id].component;
    delete this.fieldsById[id];
    this.notifyFieldCountChange(component);
  }

  addField(
    component: FieldComponentName
  ): void {
    
    const id: string = this.generateUID();

    this.sharedFields.addField({
      component,
      id
    })
  }

  private createField(
    component: FieldComponentName, 
    id: string,
    values?: Object,
    touched: boolean = false,
  ): Field {
    
    const Field = new FieldsBuilder();
    
    return Field.setComponent(component)
         .setId(id)
         .setName(this.config.dynamicFields[component]['trivialName'])
         .setTouched(touched)
         .setLocales(this.config.dynamicFields[component]['config']['locales'])
         .setConfig(this.config.dynamicFields[component]['config'])
         .setValues(values)
         .build();
  }

  private createStaticField(
    id: string,
    values?: Object,
    touched: boolean = false
  ) {
    return (new FieldsBuilder())
     .setComponent(this.config.staticFields[id]['type'])
     .setId(id)
     .setStatic(true)
     .setTouched(touched)
     .setName(this.config.staticFields[id]['trivialName'])
     .setLocales(this.config.staticFields[id]['config']['locales'])
     .setConfig(this.config.staticFields[id]['config'])
     .setValues(values)
     .build();
  }

  notifyFieldsChange(): void {
    this.save();

    this.fieldsChange.next({
      fields: this.fieldsById,
      order: this.fieldsOrder
    });

   
  }

  notifyFieldCountChange(component) {
    this.fieldCountChange.next(component);
  }

  notifyFieldChange(id?: string) {
    const nextId: string = id || '';

    this.fieldChange.next(nextId);
    
    this.save();
  }
}
