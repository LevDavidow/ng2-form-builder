import {
  Component, 
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

import { 
  Field, 
  Locales 
} from '../models';

import {
  FieldComponentName,
  HEADLING, 
  GALLERY, 
  CITE, 
  WYSIWYG, 
  BACKGROUNDED_TEXT, 
  PICTURE, 
  VIDEO, 
  BUTTON, 
  HIGHLIGHTED_TEXT
} from '../consts';

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
  private componentRender: FieldComponentName;
  private consts = {
    HEADLING, 
    GALLERY, 
    CITE, 
    WYSIWYG, 
    BACKGROUNDED_TEXT, 
    PICTURE, 
    VIDEO, 
    BUTTON, 
    HIGHLIGHTED_TEXT
  }
  
  constructor(private fieldsService: FieldsService) {}

  private getField(id = this.id):Field {
    return this.fieldsService.fieldsById[this.id];
  }

  handleUpdate() {
    this.values = this.getField(this.id).values;
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
