import { 
  Component, 
  OnInit, 
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { Field, Locales } from '../models';

import { FieldsService } from '../services/fields.service';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: '1'
      })),
      transition(':enter', [
        style({
          transform: 'translateX(100%)',
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
export class FieldListComponent implements OnInit {
  @Input() fields: Field[];
  private dragId: string;
  @Input() locales: Locales = new Locales();

  public title: string = 'Вы уверенны?';
  public message: string = 'Вы не сможете восстановить содержимое этого поля';

  constructor(
    private fieldsService: FieldsService, 
    private dragulaService: DragulaService 
  ) {
    
    this.dragId = FieldListComponent.generateUID(); 

    dragulaService.setOptions(this.dragId, {
      moves: function (el, container, handle) {
        return handle.className.indexOf('field-move') > -1;
      }
    });

    dragulaService.dropModel.subscribe((value) => {
      if (FieldListComponent.isCurrentDragula(value, this.dragId)) {
        this.onChange();
      } 
    })
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

  private trackFields(index, field) {
    return field.id;
  }

  removeField(id) {
    this.fieldsService.removeField(id);
  }

  upField(index) {
    this.applyFieldMove(
      (index > 0),
      (index - 1),
      index
    )
  }

  downField(index) {
    this.applyFieldMove(
      (index < this.fields.length - 1),
      (index + 1),
      index
    )
  }
  
  private applyFieldMove(condition: boolean, newIndex: number, index: number): void {
    if (condition) {
      this.fieldsService.updateFields(
        FieldListComponent
          .applyIndex(
            [...this.fields], 
            newIndex,
            index,
          )
      ) 
    }
  }

  static applyIndex(arr, newIndex, oldIndex): Array<any> {
    const temp = arr[newIndex];
    arr[newIndex] = arr[oldIndex];
    arr[oldIndex] = temp;
    return arr;
  }

  ngOnInit() {

  }
  onChange() {
    this.fieldsService.updateFields(this.fields);
    console.log(this.fieldsService);
  }

}
