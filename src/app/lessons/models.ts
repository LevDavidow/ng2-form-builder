import { Field, FieldOptions } from '../models';

export type ButtonValueType = 'current' | 'blank' | 'download';
export type VideoProvider = 'vimeo' | 'youtube';


interface TextOptions extends FieldOptions {
  values?: {
    text?: string,
  }
}

interface ICiteoptions extends FieldOptions {
  values?: {
    text?: string,
    alternative?: boolean
  }
}

interface GalleryOptions extends FieldOptions {
  values?: {
    images?: string[]
  }
}

interface PictureOptions extends FieldOptions {
  values?: {
    wide?: boolean
    images?: string[]
  }
}

interface VideoOptions extends FieldOptions {
  values?: {
    text?: string,
    url?: string,
    type?: VideoProvider
  }
}

interface HeroImageText extends FieldOptions {
  values?: {
    text?: string,
    images?: string[]
  }
}

interface IButtonOption extends FieldOptions {
  values?: {
    text?: string,
    type: ButtonValueType,
    label: string
  }
}

export class Headling extends Field {
  protected defaultValues: Object = {
    text: ''
  }

  constructor(opts: TextOptions) {
    super(opts);
    super.applyDefaults(this.defaultValues);
  }
}

export class Gallery extends Field {
  protected defaultValues: Object = {
    images: []
  }

  constructor(opts: GalleryOptions) {
    super(opts);
    super.applyDefaults(this.defaultValues);
  }
}

export class Wysiwyg extends Field {
  protected defaultValues: Object = {
    text: ''
  }

  constructor(opts: TextOptions) {
    super(opts);
    super.applyDefaults(this.defaultValues);
  }
}

export class BackgroundedText extends Field {
  protected defaultValues: Object = {
    text: '',
    images: []
  }

  constructor(opts: HeroImageText) {
    super(opts);
    super.applyDefaults(this.defaultValues);
  }
}

export class Button extends Field {
  protected defaultValues: Object = {
    text: '',
    type: 'current',
    content: ''
  }

  constructor(opts: TextOptions) {
    super(opts);
    super.applyDefaults(this.defaultValues);
  }
}

export class HiglightedText extends Field {
  protected defaultValues: Object = {
    text: ''
  }

  constructor(opts: TextOptions) {
    super(opts);
    super.applyDefaults(this.defaultValues);
  }
}

export class Video extends Field {
  protected defaultValues: Object = {
    text: '',
    url: '',
    type: ''
  }

  constructor(opts: VideoOptions) {
    super(opts);
    super.applyDefaults(this.defaultValues);
  }
}

export class Picture extends Field {
  protected defaultValues: Object = {
    wide: false,
    images: []
  }

  constructor(opts: PictureOptions) {
    super(opts);
    super.applyDefaults(this.defaultValues);
  }
}


export class Cite extends Field {
  protected defaultValues: Object = {
    alternative: false,
    text: ''
  }

  constructor(opts: TextOptions) {
    super(opts);
    super.applyDefaults(this.defaultValues);
  }
}