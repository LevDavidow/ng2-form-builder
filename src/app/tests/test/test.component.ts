import { 
  Component, 
  OnInit,
  OnChanges,
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { generateUID, isCurrentDragula } from '../../helpers';

import { Locales } from '../../models';

import { ITestOptionsOption } from '../models';

@Component({
  selector: 'field-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() config: any;
  @Output() update: EventEmitter<any>;
  public dragId: string;

  private questionName: string;
  private points: number;
  private description: string;
  private image: string[];
  private allowCustom:boolean;
  private options: ITestOptionsOption[];

  constructor(private dragulaService: DragulaService) {
  	this.update = new EventEmitter();
  	this.dragId = generateUID(); 

    dragulaService.setOptions(this.dragId, {
      moves: function (el, container, handle) {
        return handle.className.indexOf(`field-move${this.dragId}`) > -1;
      }
    });

    dragulaService.dropModel.subscribe((value) => {
      if (isCurrentDragula(value, this.dragId)) {
        this.handleUpdate();
      } 
    });
  }

  addOption() {
  	this.options.push({
  		text: '',
  		correct: false
  	})

  	this.handleUpdate();
  }

  removeOption(index) {
  	this.options = this.options.filter((item, itemIndex) => {
  		return itemIndex !== index;
  	})
  }

  handleNameUpdate(name) {
  	this.questionName = name;
  	this.handleUpdate();
  }

  handlePointsUpdate(value) {
  	this.points = value;
  	this.handleUpdate();
  }

  handleDescriptionUpdate(desc) {
  	this.description = desc;
  	this.handleUpdate();
  }

  handleAllowCustomUpdate(bool) {
  	//alert(bool);
  	this.allowCustom = !this.allowCustom;
  	this.handleUpdate();
  }
  
  handleImageUpdate(imgs) {
  	this.image = imgs
  }

  handleCurrentOptionSelected(current) {
  	this.options.forEach((item, itemIndex) => {
  		item.correct = current === itemIndex;
  	});

  	this.handleUpdate();
  }

  handleOptionTextUpdate(index, text) {
  	this.options.forEach((item, itemIndex) => {
  		if (index === itemIndex) {
  			item.text = text;
  		}
  	})
  	this.handleUpdate();
  }

  handleUpdate(): void {
    this.update.emit({
      	name: this.questionName,
		points: +this.points,
		description: this.description,
		image: this.image[0],
		allowCustom: this.allowCustom,
		options: this.options
    }); 
  }

  getValues() {
	this.questionName = this.values.name || '';
	this.points = this.values.points;
	this.description = this.values.description
	this.image = this.values.image ? null : [this.values.image];
	this.allowCustom = this.values.allowCustom
	this.options = this.values.options
  }

  ngOnChanges() {
    this.getValues()
  }

  ngOnInit() {
   this.getValues()
  }
}
