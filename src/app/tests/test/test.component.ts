import { 
  Component, 
  OnInit,
  OnChanges,
  Input, 
  Output, 
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { generateUID, isCurrentDragula } from '../../helpers';

import { Locales } from '../../models';

import { ITestOptionsOption } from '../models';

@Component({
  selector: 'field-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [
    trigger('fade', [
      state('in', style({
        opacity: '1'
      })),
      transition(':enter', [
        style({
          opacity: '0'
        }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({opacity: '0'}))
      ])
    ])
  ]
})
export class TestComponent implements OnInit {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() config: any;
  @Output() update: EventEmitter<any>;
  public dragId: string;

  public questionName: string;
  public points: number;
  public description: string;
  public image: string[];
  public allowCustom:boolean;
  public options: ITestOptionsOption[];

  constructor(private dragulaService: DragulaService) {
  	this.update = new EventEmitter();
  	this.dragId = generateUID(); 

    dragulaService.setOptions(this.dragId, {
      moves: function (el, container, handle) {
        return handle.className.indexOf(`field-move${this.dragId}`) > -1;
      }
    });

    dragulaService.dropModel.subscribe((value: Array<any>) => {
      if (isCurrentDragula(value, this.dragId)) {
        this.handleUpdate();
      } 
    });
  }

  addOption() {
  	this.options.push({
  		text: '',
      touched: false,
      uid: generateUID(),
  		correct: false
  	})

  	this.handleUpdate();
  }

  removeOption(index) {
  	this.options = this.options.filter((item, itemIndex) => {
  		return itemIndex !== index;
  	})
    this.handleUpdate();
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

  handleAllowCustomUpdate() {
  	this.allowCustom = !this.allowCustom;
  	this.handleUpdate();
  }
  
  handleImageUpdate(imgs) {
  	this.image = imgs
    this.handleUpdate();
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
        item.touched = true;
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
  	this.image = this.values.image ? [this.values.image] : [];
  	this.allowCustom = this.values.allowCustom;
  	this.options = this.values.options
  }

  trackOption(index, option) {
    return option.uid;
  }

  private hasOptionsDiff(old, newOpts) {
    if (old.length !== newOpts.length) {
      return true;
    }

    for (let index in old) {
      const oldOption = old[index];
      const newOption = newOpts[index];

      if (oldOption.correct !== newOption.correct) {
        return true;
      }

      if (oldOption.text !== newOption.text) {
        return true;
      }

    }

    return false;

  }

  private hasImageDiff(current, val) {
    if(!current && val) {
      return true;
    }

    if (val && !current[0]) {
      return true;
    }

    if (current && current[0] !== val) {
      return true;
    }

    return false;
  }

  ngDoCheck() {

    let doUpdate =  this.points !== this.values.points
      || this.allowCustom !== this.values.allowCustom
      || this.questionName !== this.values.name 
      || this.description !== this.values.description
      || this.hasImageDiff(this.image, this.values.image)
      || this.hasOptionsDiff(this.options, this.values.options)
    
    if (doUpdate) {
      this.getValues();
    }

  }

  ngOnInit() {
   this.getValues()
  }
}
