import { 
  Component, 
  OnInit, 
  Input,
  Output,
  EventEmitter,
  NgZone
} from '@angular/core';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'elfinder-gallery',
  templateUrl: './elfinder-gallery.component.html',
  styleUrls: ['./elfinder-gallery.component.css']
})
export class ElfinderGalleryComponent implements OnInit {
  @Output() onChange: EventEmitter<string[]>;
  
  @Input() images: string[] = []
  @Input() id: string = 'w2';
  @Input() lang: string = 'ru';
  @Input() url: string = 'http://scorim_adm.dev/elfinder/manager/?filter=image';
  
  @Input() imgBaseUrl: string = 'http://uteka_adm.dev';


  @Input() singlePicture: boolean = true;
  
  @Input() alertText: string = 'Вы должны выбрать изображение';
  @Input() buttonText: string = 'Выбрать изображение';

  private elfinderNode: any;

  private inputValue: string;

  private _id: string;

  private dradId: string;

  constructor(
    private zone: NgZone, 
    private dragulaService: DragulaService ) {

    this.dradId = ElfinderGalleryComponent.generateUID();

    dragulaService.setOptions(this.dradId , {
      moves: function (el, container, handle) {
        return true;
      }
    });

    dragulaService.dropModel.subscribe((value) => {
      if (ElfinderGalleryComponent.isCurrentDragula(value, this.dradId )) {
        this.updateImages();
      } 
    })

    this.onChange = new EventEmitter();
    this.registerElfinderCallback();
  }

  private static isCurrentDragula(dragulaValue, id) {
    return dragulaValue[0] === id;
  }

  private static generateUID(): string {
    let i, random;
    let result = '';

    for (i = 0; i < 15
      ; i++) {
        random = Math.random() * 16 | 0;
        result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }

    return result;
  }

  openElfinder() {
    window['mihaildev'].elFinder.openManager({
      "url": [
        `${this.url}?callback=${this._id}`,
        `lang=${this.lang}`, 
        `filter=image`,
        `multiple=${this.singlePicture ? 0 : 1}`
      ].join('&'),
      "width":"auto",
      "height":"auto"
    });
  }

  registerElfinderCallback() {
    
    if( !window['mihaildev'] ) {
      return;
    }

    window['mihaildev'].elFinder.register(this._id, this.elfinderCallback.bind(this));
  }

  elfinderCallback(file): boolean {
    
    if (this.singlePicture) {
      console.log(file);
      this.inputValue = file[0].url;
    } else {
      const preparedValues = file.map(res => res.url).join(',')
      this.inputValue = this.inputValue ? this.inputValue + ',' + preparedValues : preparedValues
    }
    
    this.handleValueChange();
    this.zone.run(() => 'tezt');
    return true;
  }

  updateImages() {
    this.inputValue = this.images.join(',');
    this.handleValueChange();
  }

  removeImage(index: number) {
    this.images = this.images.filter((item, i) => i !== index);
    this.inputValue = this.images.join(',');
    this.handleValueChange();
  }

  handleValueChange() {
    
    console.log(this.images);

    this.images = this.inputValue ? this.inputValue.split(',') : [];
    this.onChange.emit(this.images);
  }


  ngOnInit() {
    this._id = `el${this.id}`;
    this.registerElfinderCallback();
  }

}
