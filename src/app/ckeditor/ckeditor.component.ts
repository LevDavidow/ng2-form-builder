import { Component, Input, Output, EventEmitter, OnInit, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ElfinderHeightMemoService } from '../elfinder-height-memo.service';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css'],
})

export class CkeditorComponent implements OnInit {
  @Input() debounce: number;
  @Input() config: any;
  @Input() key: string = '';
  @Input() model: string;
  
  @Output() focus: EventEmitter<any>;
  @Output() blur: EventEmitter<any>;
  @Output() change: EventEmitter<any>;
  
  @ViewChild('root') root; 

  private _minHeight: number = 0;
  
  constructor (private heightService: ElfinderHeightMemoService) {
    this.change = new EventEmitter();
    this.blur = new EventEmitter();
    this.focus = new EventEmitter();
  }
  
  get minHeight(): string {
    return this._minHeight + 'px';
  }

  ngOnInit() {
    this._minHeight = this.heightService.getHeight(this.key);
  }

  handleReady() {
    const height: number =  this.root.nativeElement.offsetHeight
    this.heightService.setHeight(this.key, height);
  }

  handleUpdate($text): void {
    this.change.emit($text);
  }

  handleBlur() {
    this.blur.emit(1)
  }

  handleFocus() {
    this.focus.emit(1);
  }
}
