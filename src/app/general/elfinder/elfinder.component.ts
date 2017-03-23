import { 
  Component, 
  OnInit, 
  OnChanges,
  Input,
  Output,
  EventEmitter,
  NgZone
} from '@angular/core';

@Component({
  selector: 'elfinder',
  templateUrl: './elfinder.component.html',
  styleUrls: ['./elfinder.component.css']
})
export class ElfinderComponent implements OnInit, OnChanges {
  @Output() onChange: EventEmitter<string>;
  @Input() fileUrl: string = 'http://www.mariatrudler.com/wp-content/uploads/salvador-dali-1.jpg';
  @Input() id = 'lol';
  @Input() lang: string = 'ru';
  @Input() url: string = 'http://scorim_adm.dev/elfinder/manager/';
  @Input() text: string = 'Загрузить файл';
  @Input() placeholder: string = 'Введите ссылку на файл' ;
  
  private inputValue: string = '';
  private _id: string;

  constructor(private zone: NgZone) {
    this.onChange = new EventEmitter();
  }

  openElfinder() {
    window['mihaildev'].elFinder.openManager({
      "url": [
        `${this.url}?callback=${this._id}`, 
        `lang=${this.lang}`
      ].join('&'),
      "width":"auto",
      "height":"auto",
      getFileCallback : function(files, fm) {
            console.log(files);
      },
    });
  }

  registerElfinderCallback() {
    
    if( !window['mihaildev'] ) {
      return;

    }

    window['mihaildev'].elFinder.register(this._id, (file, id) => {
      this.inputValue = file.url;
      this.handleChange();
      this.zone.run(() => 'test');
      return true;
    });
  }

  handleChange() {
    this.onChange.emit(this.inputValue);
  }

  ngOnChanges() {
    this.inputValue = this.fileUrl;
  }

  ngOnInit() {
    this.inputValue = this.fileUrl;
    this._id = `el${this.id}`;
    this.registerElfinderCallback();
  }

}
