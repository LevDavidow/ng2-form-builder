import { 
  Component, 
  ElementRef
} from '@angular/core';

import { PersistanceValidationService, TValidationErrors } from './services/persistance-validation.service';
import { FieldsStorageService } from './services/fields-storage.service';

import { LangAutocompleteStatusService, ILangAutocompleteStatus } from './services/lang-autocomplete-status.service'

import {Locales} from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PersistanceValidationService, FieldsStorageService, LangAutocompleteStatusService]
})
export class AppComponent  {
  public configs: Object[];
  private validationErrors: TValidationErrors;
  private langsAutocompleted: ILangAutocompleteStatus = {};
  private currentLang = '';

  private hasError: boolean;
  private submitButton: HTMLElement;
  private t: Locales = new Locales();

  private hideValidationError: boolean = true;

  private element: HTMLHtmlElement;

  constructor (
    private elementRef: ElementRef,
    public validation: PersistanceValidationService,
    private autompleteLang: LangAutocompleteStatusService
  ) {
    this.element = this.elementRef.nativeElement;
    
    const config = JSON.parse(this.element.getAttribute('config'));
    
    this.t = new Locales(config.config.locales);

    this.connectSubmitButton(config.config.persist.submitButtonId);


    this.validation
        .isValid
        .subscribe(this.updateErrorState.bind(this));
    
    this.autompleteLang
        .langAutocompleteStatusChange
        .subscribe(this.updateAutocompleteStatus.bind(this));

    const persistance = config.config.persist;

    if (!persistance || 
      AppComponent.isInputPersistance(persistance) && 
      !AppComponent.isMultiplePersistance(persistance)
    ) {
      this.configs = [config];
    } else if (
      persistance &&
      AppComponent.isInputPersistance(persistance) && 
      AppComponent.isMultiplePersistance(persistance)
    ) {
      this.configs = persistance.selectors.map((item) => {
        const computedConfig = Object.assign({}, config, {
          staticFields: AppComponent.applyStaticFieldsLocale(config.staticFields, item.name),
          config: {
            persist: {
              type: 'input',
              selector: item.selector,
              name: item.name
            },
          }
        });
        return computedConfig 
      });
    } 

    this.configs[0]['active'] = true;
    const currentLang = this.configs[0]['config']['persist']['name']
    this.currentLang = currentLang;
    this.autompleteLang.viewAutocomplete(currentLang);
  }

  private connectSubmitButton(selector) {
    this.submitButton = document.getElementById(selector);
    
    if(this.submitButton) {
      this.submitButton.addEventListener('click', (e) => {
        
        this.setLangViewed(this.currentLang);

        const lang = this.autompleteLang.getAutocompletedLang();

        if (lang) {
          e.preventDefault();
          this.focus();
          this.activateTab(lang);
        }
        
        
        if (this.hasError) {
          e.preventDefault();
          this.hideValidationError = false;
          this.validation.setShowErrors(true)
          this.focus();
          this.disableSubmit();
          return false;
        }
      })
    }
  }

  private focus() {
    this.element.scrollIntoView(true);
  }


  private activateTab(lang) {
    this.configs.forEach((config) => {
      config['active'] = (config['config']['persist']['name'] === lang);
    })
  }

  private updateErrorState(errors) {
    this.validationErrors = errors;
    this.hasError = errors.reduce((result, value) => result ? result : value.errors.length > 0, false);

    if (this.submitButton && !this.hideValidationError) {
      if (this.hasError) {
        this.disableSubmit();
      } else {
        this.enableSubmit();
      }
    }
  }

  private setCurrentLang(lang: string) {
    this.currentLang = lang;
  }

  public setLangViewed(lang: string) {
    this.autompleteLang.viewAutocomplete(lang);
  }

  private updateAutocompleteStatus(langs: ILangAutocompleteStatus) {
    this.langsAutocompleted = langs;
  }

  private disableSubmit() {
    this.submitButton.classList.add('disabled');
  }

  private enableSubmit() {
    this.submitButton.classList.remove('disabled');
  }


  private static isInputPersistance(persistance): boolean {
    return persistance.type === 'input';
  }

  private static applyStaticFieldsLocale(fields: Object, locale: string) {
    return Object
      .keys(fields)
      .map(id => Object.assign({}, fields[id], {id: id}))
      .map(field => Object.assign({}, field, {
        config: Object.assign({}, field.config, {
          locale: locale
        })
      }))
      .reduce((result, item) => {
        result[item.id] = item;
        return result;
      }, {});  
  }

  private static isMultiplePersistance(persistance): boolean {
    return Array.isArray(persistance.selectors);
  }
}
