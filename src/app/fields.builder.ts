import { 
  Field, 
  FieldOptions, 
  Locales, 
  ILocales 
} from './models';

import { 
  Headling, 
  Wysiwyg,
  Picture,
  Gallery,
  Button,
  Video,
  HiglightedText,
  BackgroundedText,
  Cite,
} from './lessons/models';

import {
  FieldComponentName,
  HEADLING, 
  GALLERY, 
  CITE, 
  WYSIWYG, 
  BACKGROUNDED_TEXT, 
  PICTURE, 
  VIDEO, 
  BUTTON, 
  HIGHLIGHTED_TEXT
} from './consts';

export default class FieldsBuilder {
  private component: FieldComponentName;
  private static: boolean = false;
  private id: string = '';
  private name?: string = '';
  private locales: ILocales;
  private config?: any;
  private values?: any;
  private trivialName?: string; 
  private touched: boolean = false;

  private getConfig(): FieldOptions {
    return {
      id: this.id,
      name: this.name,
      static: this.static,
      locales: this.locales,
      component: this.component,
      config: this.config,
      values: this.values,
      touched: this.touched
    }
  }

  public setComponent(component: FieldComponentName) {
    this.component = component;

    return this;
  } 
  
  public setConfig(config?: any) {
    if (config) {
      this.config = config;
    }
    
    return this;
  }

  public setValues(values?: any) {
    if (values) {
      this.values = values;
    }

    return this;
  }

  public setName(name: string) {
    this.name = name;

    return this;
  }

  public setId(id: string) {
    this.id = id;

    return this;
  }

  public setStatic(is: boolean) {
    this.static = is || false;

    return this;
  }

  public setTouched(is: boolean) {
    this.touched = is || false;

    return this;
  }

  public setLocales(locales: ILocales) {
    this.locales = locales;

    return this;
  }

  public setTrivialName(name?: string) {
    if (name) {
      this.trivialName = name;
    }

    return this;
  }

  public build(): Field {
    const config = this.getConfig();

    switch (config.component) {
      case HEADLING:
        return new Headling(config);
      case GALLERY:
        return new Gallery(config);
      case CITE: 
        return new Cite(config);
      case WYSIWYG:
        return new Wysiwyg(config);
      case BACKGROUNDED_TEXT: 
        return new BackgroundedText(config);
      case PICTURE:
        return new Picture(config);
      case VIDEO:
        return new Video(config);
      case BUTTON: 
        return new Button(config);
      case HIGHLIGHTED_TEXT: 
        return new HiglightedText(config);
      default:
        alert(`Unrecognized field ${config.component}`);
    }
  }
}