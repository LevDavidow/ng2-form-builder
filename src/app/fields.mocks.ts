interface FieldsById {
  [id: string]: any
}

export const fieldsConfig: any = {
    dynamicFields: {
      'HEADLING': {
        trivialName: 'Заголовок',
        config: {
          locales: {
            'Заголовок': 'Заголовок',
            'Введите заголовок': 'Введите заголовок',
          }
        }
      },
      'WYSIWYG': {
        trivialName: 'Текстовое поле',
        config: {
          ckeditor: {
            extraPlugins: 'divarea',
            skin: 'flat,/ckeditor/flat/',
            removePlugins: 'elementspath',
            removeButtons: 'Underline,Subscript,Superscript,Source,Image,Styles,Format',
            toolbarGroups: [
              { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
              { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
              { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
              { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
              { name: 'links', groups: [ 'links' ] },
              { name: 'tools', groups: [ 'tools' ] },
              { name: 'others', groups: [ 'others' ] },
              { name: 'styles', groups: [ 'styles' ] },
              { name: 'colors', groups: [ 'colors' ] },
              { name: 'about', groups: [ 'about' ] }
            ]
          }
        }
      },
      'PICTURE': {
        trivialName: 'Картинка',
        config: {
          elfinder: {
            url: 'http://scorim_adm.dev/elfinder/manager',
            lang: 'ru',
          },
          locales: {
            'Выбрать изображение': 'Выбрать изображение',
            'Вы должны выбрать изображение': 'Вы должны выбрать изображение',
            'Растянуть на весь экран?': 'Растянуть на весь экран?'
          }
        }
      },
      'GALLERY': {
        trivialName: 'Галерея',
        config: {
          elfinder: {
            url: 'http://scorim_adm.dev/elfinder/manager',
            lang: 'ru',
          },
          locales: {
            'Выбрать изображение': 'Выбрать изображение',
            'Вы должны выбрать изображение': 'Вы должны выбрать изображение'
          }
        }
      },
      'BUTTON': {
        trivialName: 'Кнопка',
        config: {
          elfinder: {
            url: 'http://scorim_adm.dev/elfinder/manager',
            lang: 'ru',
          },
          locales: {
            'Вставте ссылку или выберите файл': 'Вставте ссылку или выберите файл',
            'Введите ссылку на файл': 'Введите ссылку на файл',
            'Загрузить файл': 'Введите ссылку на файл'
          }
        }
      },
      'VIDEO': {
        trivialName: 'Видео',
        config: {
          locales: {
            'Введите URL видео на Youtube или Vimeo': 'Введите URL видео на Youtube или Vimeo',
            'Введите URL видео': 'Введите URL видео'
          }
        }
      },
      'HIGHLIGHTED_TEXT': {
        trivialName: 'Выделенный текст',
        config: {
          locales: {
            'Выделенный текст': 'Выделенный текст',
            'Введите текст': 'Введите текст'
          }
        }
      },
      'CITE': {
         trivialName: 'Цитата',
         config: {
          locales: {
            'Цитата': 'Цитата',
            'Введите цитату': 'Введите цитату'
          }
        }
      },
      'BACKGROUNDED_TEXT': {
        trivialName: 'Текст с картинкой',
        config: {
          elfinder: {
            url: 'http://scorim_adm.dev/elfinder/manager',
            lang: 'ru',
          },
          ckeditor: {
            extraPlugins: 'divarea',
            skin: 'flat,/ckeditor/flat/',
            removePlugins: 'elementspath',
            removeButtons: 'Underline,Subscript,Superscript,Source,Image,Styles,Format',
            toolbarGroups: [
              { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
              { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
              { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
              { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
              { name: 'links', groups: [ 'links' ] },
              { name: 'tools', groups: [ 'tools' ] },
              { name: 'others', groups: [ 'others' ] },
              { name: 'styles', groups: [ 'styles' ] },
              { name: 'colors', groups: [ 'colors' ] },
              { name: 'about', groups: [ 'about' ] }
            ]
          },
          locales: {
            'Выбрать изображение': 'Выбрать изображение',
            'Вы должны выбрать изображение': 'Вы должны выбрать изображение'
          }
        }
      },
    },
    config: {
      endpoint: 'http://google.com',
      currentLocale: 'ru',
      locales: {
        'Передвинуть поле': 'Передвинуть поле',
        'Удалить': 'Удалить'
      }
    }
  }

export const fieldsById: FieldsById = {
  '1242112': {
    component: 'CITE',
    values: {
      text: ''
    }
  }
}

export const fieldsOrder: string[] = ['1242112']
