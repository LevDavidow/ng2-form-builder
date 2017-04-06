import { 
  Component, 
  OnInit, 
  OnChanges,
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';

import { Locales, processMaxLength } from '../../models';


@Component({
  selector: 'wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.css']
})
export class WysiwygComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() public config: any;
  @Output() update: EventEmitter<any>;

  public text: string;

  public required: boolean;
  public maxLength: number;


  constructor () {
    this.update = new EventEmitter();
  }

  handleUpdate(): void {

    this.values = {text: this.text}
    this.update.emit(this.values);
  }

  handleTextUpdate($text) {
    this.text = $text;

    if (this.maxLength) {
      this.text = processMaxLength(this.text, this.maxLength)
    }
    
    this.handleUpdate();
  }

  getValues() {
    this.text =  this.values.text;
  }

  ngOnChanges(changes) {
    this.getValues()
  }

  ngOnInit() {
    this.getValues()

    this.maxLength = this.config.validation['max-length'];
    this.required = this.config.validation.required;
  }
}
