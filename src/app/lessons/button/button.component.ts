import { 
  Component, 
  OnInit,
  OnChanges,
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';

import { Locales } from '../../models';

import { ButtonValueType } from '../models';

@Component({
  selector: 'button-field',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() config: any;
  @Output() update: EventEmitter<any>;

  public text: string = '';
  public type: ButtonValueType;
  public content: string = '';

  constructor () {
    this.update = new EventEmitter();
  }

  handleUpdate(): void {
    this.update.emit({
      text: this.text,
      type: this.type,
      label: this.content
    }); 
  }

  handleTextUpdate($text): void {
    this.text = $text;
    console.log($text);
    this.handleUpdate();
  }

  handleTypeUpdate($type): void {
    this.type = $type;
    this.handleUpdate();
  }

  getValues() {
    this.text =  this.values.text;
    this.type = this.values.type;
    this.content = this.values.label;
  }

  ngOnChanges(changes) {
    this.getValues()
  }

  ngOnInit() {
   this.getValues()
  }
}
