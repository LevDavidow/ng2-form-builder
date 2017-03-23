import { 
  Component, 
  OnInit, 
  OnChanges,
  Input, 
  EventEmitter, 
  Output  
} from '@angular/core';

import { Locales, processMaxLength } from '../../models';

@Component({
  selector: 'backgrounded-text',
  templateUrl: './backgrounded-text.component.html',
  styleUrls: ['./backgrounded-text.component.css']
})
export class BackgroundedTextComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() config: any;
  @Output() update: EventEmitter<any>;

  private images: string[];
  private text: string;

  private required: boolean;
  private maxLength: number;

  constructor () {
    this.update = new EventEmitter();
  }

  handleImagesUpdate($images) {
    this.images = $images;
    this.handleUpdate();
  }



  handleUpdate() {    
    this.values = {
      images: this.images,
      text: this.text
    }
    this.update.emit(this.values);  
  }

  handleTextUpdate($text) {
    this.text = $text;

    if (this.maxLength) {
      this.text = processMaxLength(this.text, this.maxLength);
    } 

    this.handleUpdate();
  }

  getValues() {
    this.images = this.values.images;
    this.text = this.values.text;
  }

  ngOnChanges() {
    this.getValues();
  }

  ngOnInit() {
    this.getValues();

    this.maxLength = this.config.validation['max-length'];
    this.required = this.config.validation.required;

  }

}
