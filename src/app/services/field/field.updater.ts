import { Field } from '../../models';
import * as fieldTypes from '../../consts';

import { ReducedArray } from '../../helpers';

import { IFieldUpdated } from '../fields-storage.service'


const rules = {
	counter: {
		optionAdded(prev: ReducedArray, current: ReducedArray) {
			return prev.order.length < current.order.length;
		},
		optionRemoved(prev: ReducedArray, current: ReducedArray) {
			return prev.order.length > current.order.length;
		}
	}
}

const Updates = {
	[fieldTypes.TEST]: function(field: Field, config: IFieldUpdated) {
		if (!field.values['name']) {
			field.values['name'] = config.values['name'];
		}

		if (!field.values['description']) {
			field.values['description'] = config.values['description'];
		}

		if (!field.values['image']) {
			field.values['image'] = config.values['image'];
		}

		field.values['allowCustom'] = config.values['allowCustom'];
		field.values['points'] = config.values['points'];

		if (!config.values['options']) {
			return;
		}

		let correctIdIndex;
		
		for (let i = 0; i < config.values['options'].length; i ++) {
			if (config.values['options'][i]['correct']) {
				correctIdIndex = i;
			}
		}

		if (isFinite(correctIdIndex)) {
			field.values['options'].forEach((option, index) => {

				option.correct = correctIdIndex === index;
			});
		}

		const oldOptions = new ReducedArray(field.values['options'], 'uid');
		const newOptions = new ReducedArray((<Object[]>config.values['options']), 'uid');

		if (!ReducedArray.isLengthEqual(oldOptions, newOptions)) {
			if (rules.counter.optionAdded(oldOptions, newOptions)) {
				const key = ReducedArray.findDifferentKey(newOptions, oldOptions);
				oldOptions.create(key, newOptions.keys[key]);
			}

			if (rules.counter.optionRemoved(oldOptions, newOptions)) {
				const key = ReducedArray.findDifferentKey(oldOptions, newOptions);
				oldOptions.delete(key);
			}
		}
		

		field.values['options'] = oldOptions.reduceBack().map((option, value) => {
				
			if (!option.touched) {
				option.text = newOptions.read(option.uid).text
			} 
			return option 
		});
	}
}

const Touches = {
	[fieldTypes.COUNTER]: {

	}
}

export class FieldUpdater  {
  private runCallback: boolean = false;
  public target: Field; 
  public config: IFieldUpdated;

  constructor() {}

  public run(target, config, callback?) {
  	this.target = target;
  	this.config = config;

  	this.execute(target, config, callback);
  }

  public touch(target, values) {
  	target.touched = true;
  }

  private execute(target, config, callback) {
  	const isRegularUpdate = this.shouldUpdateFieldValues()
    
    if (isRegularUpdate) {
      this.runCallback = true;

      FieldUpdater.doUpdateFieldVealues(target, config);

    } 
    
    if (this.fieldNeedSpecialUpdate()) {
      FieldUpdater.doSpecialUpdateFieldValues(target, config);

      this.runCallback = true
    }

    if (this.runCallback) {
      callback();
    }
  }

  private shouldUpdateFieldValues() {
    return !this.target.touched;
  }

  static doUpdateFieldVealues(target, config) {
    target['values'] = config.values;
  }

  private fieldNeedSpecialUpdate() {
  	return !!Updates[this.target.component]
  }


  static doSpecialUpdateFieldValues(target, config) {
  	Updates[target.component](target, config);
  }
}
