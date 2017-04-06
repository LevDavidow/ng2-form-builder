import { 
  Component, 
  OnInit, 
  Input, 
  EventEmitter, 
  Output,
  OnChanges
} from '@angular/core';

import { Locales } from '../../models';

@Component({
  selector: 'picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() config: any;
  @Output() update: EventEmitter<any>;

  public images: string[];
  public wide: boolean;

  constructor () {
    this.update = new EventEmitter();
  }

  handleUpdate() {
    this.update.emit({
      images: this.images,
      wide: this.wide
    });  
  }

  handleImagesUpdate($images) {
    this.images = $images;
    this.handleUpdate();
  }

  handleWideUpdate() {
    this.wide = !this.wide;
    this.handleUpdate();
  }

  getValues() {
    this.images = this.values.images;
    this.wide = this.values.wide;
  }
  
  ngOnChanges(changes) {
    this.getValues();
  }

  ngOnInit() {
    this.getValues();
  }
}
