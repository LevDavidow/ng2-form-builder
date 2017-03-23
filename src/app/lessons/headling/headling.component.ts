import { 
  Component, 
  OnInit, 
  OnChanges,
  Input, 
  EventEmitter, 
  Output
} from '@angular/core';

import { Locales, processMaxLength} from '../../models';

@Component({
  selector: 'headling',
  templateUrl: './headling.component.html',
  styleUrls: ['./headling.component.css']
})
export class HeadlingComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() public config: any;
  @Output() update: EventEmitter<any>;

  private text: string;
  private maxLength: number;
  private required: boolean;

  constructor () {
    this.update = new EventEmitter();
  }

  handleTextUpdate(text) {
    this.text = text;
    
    if (this.maxLength) {
      this.text = processMaxLength(this.text, this.maxLength);
    }
  }

  handleUpdate() {
    this.values = {
      text: this.text
    }

    this.update.emit(this.values);  
  }
  
  getValues() {
    this.text =  this.values.text;
  }

  ngOnChanges() {
    this.getValues();
  }

  ngOnInit() {
    this.getValues();
    this.required = this.config.validation.required;
    this.maxLength = this.config.validation['max-length'];
  }
}
