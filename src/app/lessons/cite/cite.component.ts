import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';

import { Locales } from '../../models';

@Component({
  selector: 'cite',
  templateUrl: './cite.component.html',
  styleUrls: ['./cite.component.css']
})
export class CiteComponent implements OnInit {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() public config: any;
  @Output() update: EventEmitter<any>;

  private text: string;
  private alternative: boolean;

  constructor () {
    this.update = new EventEmitter();
  }

  handleUpdate() {
    this.update.emit({
      text: this.text,
      alternative: this.alternative
    });  
  }

  handleAlt() {
    this.alternative = !this.alternative;
    this.handleUpdate();
  }


  getValues() {
    this.text =  this.values.text;
    this.alternative = this.values.alternative;
  }
  
  ngOnChanges() {
    this.getValues();
  }

  ngOnInit() {
    this.getValues();
  }

}
