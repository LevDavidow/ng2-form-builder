import {
  Component, 
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { 
  Field, 
  Locales 
} from '../models';

import  * as fieldNames from  '../consts';

import { FieldsService } from '../services/fields.service';

@Component({
  selector: 'field',
  styleUrls: ['./field.component.css'],
  templateUrl: './field.component.html'
})
export class FieldComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() index: number;

  public values: any;
  public config?: any;
  public t: Locales = new Locales();

  public preview: boolean = true;

  private previewSubsripbtion;
  private valuesSubscription;
  public componentRender: fieldNames.FieldComponentName;
  public consts = fieldNames;
  
  constructor(private fieldsService: FieldsService, private ref: ChangeDetectorRef) {}

  private getField(id = this.id):Field {
    return this.fieldsService.fieldsById[this.id];
  }

  handleUpdate() {
    this.values = this.getField(this.id).values;
    this.config = this.getField(this.id).config;
  }

  updateValues($values) {
    this.fieldsService.updateField(this.id, $values);
  }
 
  ngOnInit() {
    const field: Field = this.getField(this.id);
    
    this.componentRender = field.component;
    this.config = field.config;
    
    if (field.locales) {
      this.t = field.locales;
    }

    this.handleUpdate();

    this.valuesSubscription = this.fieldsService
      .fieldChange
      .filter((id: string) => id === this.id)
      .subscribe(this.handleUpdate.bind(this));
  }

  ngOnDestroy() {
    this.valuesSubscription.unsubscribe();
  }
}
