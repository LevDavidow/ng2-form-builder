import { 
  Component, 
  OnInit,
  OnChanges,
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';

import { Locales } from '../../models';

@Component({
  selector: 'field-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() config: any;
  @Output() update: EventEmitter<any>;

  constructor() {
  	 this.update = new EventEmitter();
  }

  ngOnInit() {
  }

}
