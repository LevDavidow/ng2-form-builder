import { Injectable } from '@angular/core';
import { FieldsService } from './fields.service'

import * as fieldTypes from '../consts'

interface IWatcher {
	type: fieldTypes.FieldComponentName,
	run: string
}

interface ICounter {
	id: string,
	reduceType: fieldTypes.FieldComponentName,
	reduceKey: string
};

@Injectable()
export class FieldHooksService {
  private counters: ICounter[] = [];
  private watchers: IWatcher[] = [];

  constructor(private provider: FieldsService) {
	provider.inited.subscribe(() => {

		if (this.fetchCounters().length) {
	  		this.setupCounters();
	  	}

	  	this.provider.fieldChange.subscribe((id: string) => {
	  		const target = this.provider.fieldsById[id]
	  		if (!target) {
	  			return;
	  		}
	  		this.apply(target.component);
	  	});

	  	this.provider.fieldCountChange.subscribe(component => {
	  		this.apply(component);
	  	})
	})
  }

  apply(component) {
  	this.watchers.forEach((watcher) => {
  		if (watcher.type === component) {
  			this.applyWatcher(watcher.run)
  		}
  	})
  }

  private applyWatcher(type) {
  	switch (type) {
  		case "counter":
  			this.runCounters();
  			break;
  		
  		default:
  			console.log('something gona wrong(', this);
  			break;
  	}
  }

  private fetchCounters(): any[] {
  	return this.provider
  		.fieldsByIdArray
  		.filter(item => item.component === fieldTypes.COUNTER)

  }

  private setupCounters() {
  	this.fetchCounters().forEach((item) => {
	  	const reduce = item.config.reduce;
	  	
	  	this.counters.push({
	  		id: item.id,
	  		reduceType: reduce.type,
	  		reduceKey: reduce.key,
	  	});

	  	this.watchers.push({
	  		type: reduce.type,
	  		run: 'counter'
	  	})
	  })
  }

  private runCounters() {
  	this.counters.forEach(counter => {
  		const currentValue = 
  			this.provider.fieldsById[counter.id]['values']['number'];

  		const newValue = this.provider.fieldsByIdArray.reduce((result, item) => {
  			if (item.component === counter.reduceType) {
  				result += item.values[counter.reduceKey] || 0;
  			}
  			return result

  		}, 0)
  		
  		if (newValue !== currentValue) {

  			setTimeout(() => {
  				this.provider.updateField(counter.id, {
  					number: newValue
  				})
  			}, 10);
  		
  		}
  	})
  }
}
