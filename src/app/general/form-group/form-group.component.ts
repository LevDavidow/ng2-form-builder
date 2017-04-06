import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { PersistanceValidationService  } from '../../services/persistance-validation.service'

@Component({
  selector: 'form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit, OnDestroy, OnChanges {
  public showError: boolean;
  public hasError: boolean;
  public unsubscribeErrors;

  @Input() values = {};
  @Input() rules = null;
  @Input() showBorder: boolean = false;

  constructor(private validation: PersistanceValidationService) {
    this.unsubscribeErrors = this
      .validation
      .showErrors.subscribe((show: boolean) => {
        this.showError = show;
      })
  }

  private noRules() {
    return !this.rules;
  }
  validate() {
    console.log(this);
    if (this.noRules()) {
      this.hasError = false;
    } else {
      this.hasError = !this.validation.valid(this.values, this.rules)
    }
  }

  ngOnInit() {
    this.validate();
  }

  ngOnChanges(changes) {
    this.validate();
  }

  ngOnDestroy() {
    if (this.unsubscribeErrors) {
      this.unsubscribeErrors.unsubscribe();
    }
  }
}
