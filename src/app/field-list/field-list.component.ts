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

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { Field, Locales } from '../models';

import { generateUID, isCurrentDragula } from '../helpers';

import { FieldsService } from '../services/fields.service';

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
export class FieldListComponent {
  @Input() fields: Field[];
  @Input() locales: Locales = new Locales();

  private dragId: string;
  
  public title: string = 'Вы уверенны?';
  public message: string = 'Вы не сможете восстановить содержимое этого поля';

  constructor(
    private fieldsService: FieldsService, 
    private dragulaService: DragulaService 
  ) {
    
    this.dragId = generateUID(); 

    dragulaService.setOptions(this.dragId, {
      moves: function (el, container, handle) {
        return handle.className.indexOf('field-move') > -1;
      }
    });

    dragulaService.dropModel.subscribe((value) => {
      if (isCurrentDragula(value, this.dragId)) {
        this.onChange();
      } 
    })
  }

  private trackFields(index: number, field: Field): string {
    return field.id;
  }

  removeField(id: string): void {
    this.fieldsService.removeField(id);
  }

  upField(index: number): void {
    this.applyFieldMove(
      (index > 0),
      (index - 1),
      index
    )
  }

  downField(index: number): void {
    this.applyFieldMove(
      (index < this.fields.length - 1),
      (index + 1),
      index
    )
  }
  
  /**
   * Helper for up/down move field through buttons clicks.
   */
  private applyFieldMove(
    condition: boolean, 
    newIndex: number, 
    index: number): void {
    if (condition === true) {
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

  /**
   * Flips values between indexes in given array
   */
  static applyIndex(
    arr: Array<any>, 
    newIndex: number, 
    oldIndex: number
  ): Array<any> {
    const temp = arr[newIndex];
    arr[newIndex] = arr[oldIndex];
    arr[oldIndex] = temp;
    return arr;
  }

  /**
   * Updates field order across service
   */
  onChange(): void {
    this.fieldsService.updateFields(this.fields);
  }

}
