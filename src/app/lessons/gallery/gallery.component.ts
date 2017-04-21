import { 
  Component, 
  OnInit, 
  Input, 
  EventEmitter, 
  Output  
} from '@angular/core';

import { Locales } from '../../models';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() config: any;

  @Output() update: EventEmitter<any>;

  public images: string[];

  constructor () {
    this.update = new EventEmitter();
  }

  handleUpdate() {
    this.update.emit({
      images: this.images
    });  
  }

  handleImagesUpdate($images) {
    this.images = $images;
    this.handleUpdate();
  }

  getValues() {
    this.images = this.values.images;
  }
  
  ngOnChanges(changes) {
    this.getValues();
  }

  ngOnInit() {
    this.getValues();
  }
}