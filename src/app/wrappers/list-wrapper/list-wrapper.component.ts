import { Component, OnInit, Input } from '@angular/core';

import { Field, Locales } from '../../models';

import FieldsBuilder  from '../../fields.builder';

import { FieldComponentName } from '../../consts';

import { FieldsService } from '../../services/fields.service';
import { ElfinderHeightMemoService } from '../../elfinder-height-memo.service';

@Component({
  selector: 'list-wrapper',
  templateUrl: './list-wrapper.component.html',
  styleUrls: ['./list-wrapper.component.css'],
  providers: [FieldsService, ElfinderHeightMemoService]
})
export class ListWrapperComponent implements OnInit {
  private locales: Locales;
  public fields: Field[];
  public staticFields: Field[];
  public fieldNames: Array<{name: string, trivialName: string, icon?: string}> = [];
  @Input() config;
  @Input() warning;
  
  constructor(public fieldsService: FieldsService) {}

  private trackField(index, field) {
    return field.id;
  }

  addField(component: FieldComponentName): void {
    this.fieldsService.addField(component);
  }

  get staticFieldsTop() {
    return this.staticFields.filter(field => !field.config || !field.config.bottom);
  }

  get staticFieldsBottom() {
    return this.staticFields.filter(field => field.config && field.config.bottom);
  }

 
  mapFields(fields, order: string[]): Field[] {
    this.staticFields = Object.keys(fields)
      .map(name => fields[name])
      .filter(field => field.static)
      .map(field => (new FieldsBuilder)
        .setId(field.id)
        .setName(field.name)
        .setStatic(true)
        .setConfig(field.config)
        .setLocales(field.config.locales)
        .setValues(field.values)
        .setComponent(field.component)
        .build()
    );

    this.fields = order.map(id => (new FieldsBuilder)
        .setId(id)
        .setName(fields[id]['name'])
        .setLocales(fields[id]['config'] && fields[id]['config']['locales'])
        .setValues(fields[id]['values'])
        .setComponent(fields[id].component)
        .build()
     );
    
    return this.fields;
  }

  ngOnInit() {
    this.fieldsService.init(this.config);
    this.locales = new Locales(this.config['config']['locales']);

    this.fieldNames = this.fieldsService.fieldNames;
    this.mapFields(this.fieldsService.fieldsById, this.fieldsService.fieldsOrder);

    this.fieldsService.fieldsChange.subscribe((next: any) => this.mapFields(next.fields, next.order));
  }
}
