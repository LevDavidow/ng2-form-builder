import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-textinput',
  templateUrl: './textinput.component.html',
  styleUrls: ['./textinput.component.css']
})
export class TextinputComponent implements OnInit {
  @Input() values: any;
  public text: string;

  constructor () {}

  ngOnInit() {
    this.text =  this.values.text;
  }

}
