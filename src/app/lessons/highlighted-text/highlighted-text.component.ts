import { 
  Component, 
  OnInit, 
  Input, 
  EventEmitter, 
  Output  
} from '@angular/core';

import { Locales } from '../../models';

@Component({
  selector: 'highlighted-text',
  templateUrl: './highlighted-text.component.html',
  styleUrls: ['./highlighted-text.component.css']
})
export class HighlightedTextComponent implements OnInit {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() public config: any;
  @Output() update: EventEmitter<any>;

  private text: string;

  constructor () {
    this.update = new EventEmitter();
  }

  handleUpdate() {
    this.update.emit({
      text: this.text
    });  
  }

  ngOnInit() {
    this.text =  this.values.text;
  }
}
