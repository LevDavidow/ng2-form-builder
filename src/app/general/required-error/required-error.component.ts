import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Locales, isInvalidValue } from '../../models';

@Component({
  selector: 'required-error',
  templateUrl: './required-error.component.html',
  styleUrls: ['./required-error.component.css']
})

export class RequiredErrorComponent implements OnInit, OnChanges {
  @Input() values: Object = {};
  @Input() t: Locales = new Locales();
  
  public hasError: boolean = false;

  constructor() { }

  validate() {
    this.hasError =  Object.keys(this.values).reduce((result, value) => {
      result = result || isInvalidValue(this.values[value]);
      return result;
    }, false)
  }

  ngOnChanges(changes) {
    this.validate();
  }

  ngOnInit() {
    this.validate()
  }

}
