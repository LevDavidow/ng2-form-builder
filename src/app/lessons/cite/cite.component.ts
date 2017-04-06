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
  @Input() public id: string;
  @Input() public values: any;
  @Input() public t: Locales;
  @Input() public config: any;
  @Output() public update: EventEmitter<any>;

  public text: string;
  public alternative: boolean;

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
  
  ngOnChanges(changes) {
    this.getValues();
  }

  ngOnInit() {
    this.getValues();
  }

}
