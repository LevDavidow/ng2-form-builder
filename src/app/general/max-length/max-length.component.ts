import { Component, OnInit, Input } from '@angular/core';
import { Locales } from '../../models';


@Component({
  selector: 'max-length',
  templateUrl: './max-length.component.html',
  styleUrls: ['./max-length.component.css']
})
export class MaxLengthComponent implements OnInit {
  @Input() current: number;
  @Input() max: number;
  @Input() t: Locales = new Locales();
  constructor() { }

  ngOnInit() {
  }

}
