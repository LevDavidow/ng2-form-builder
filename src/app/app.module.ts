import { BrowserModule } from '@angular/platform-browser';
import { NgModule,} from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { 
  ButtonsModule, 
  AlertModule,
  TabsModule
} from 'ng2-bootstrap';

import { DragulaModule } from 'ng2-dragula';

import { CKEditorModule } from 'ng2-ckeditor';

import { AppComponent } from './app.component';
import { FieldComponent } from './field/field.component';

import { FieldListComponent } from './field-list/field-list.component';
import { TextinputComponent } from './textinput/textinput.component';
import { CkeditorComponent } from './ckeditor/ckeditor.component';
import { HeadlingComponent } from './lessons/headling/headling.component';
import { ElfinderComponent } from './general/elfinder/elfinder.component';
import { ElfinderGalleryComponent } from './general/elfinder-gallery/elfinder-gallery.component';
import { GalleryComponent } from './lessons/gallery/gallery.component';
import { CiteComponent } from './lessons/cite/cite.component';
import { WysiwygComponent } from './lessons/wysiwyg/wysiwyg.component';
import { VideoComponent } from './lessons/video/video.component';
import { PictureComponent } from './lessons/picture/picture.component';
import { ButtonComponent } from './lessons/button/button.component';
import { HighlightedTextComponent } from './lessons/highlighted-text/highlighted-text.component';
import { BackgroundedTextComponent } from './lessons/backgrounded-text/backgrounded-text.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { ListWrapperComponent } from './wrappers/list-wrapper/list-wrapper.component';
import { MaxLengthComponent } from './general/max-length/max-length.component';
import { RequiredErrorComponent } from './general/required-error/required-error.component';

import { PersistanceValidationService } from './services/persistance-validation.service';
import { FieldHooksService } from './services/field-hooks.service';

import { FormGroupComponent } from './general/form-group/form-group.component';
import { CounterComponent } from './tests/counter/counter.component';
import { TestComponent } from './tests/test/test.component';
//import { DraglistComponent } from './general/draglist/draglist.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    FieldListComponent,
    TextinputComponent,
    CkeditorComponent,
    HeadlingComponent,
    ElfinderComponent,
    ElfinderGalleryComponent,
    GalleryComponent,
    CiteComponent,
    WysiwygComponent,
    VideoComponent,
    PictureComponent,
    ButtonComponent,
    HighlightedTextComponent,
    BackgroundedTextComponent,
    SafeUrlPipe,
    ListWrapperComponent,
    MaxLengthComponent,
    RequiredErrorComponent,
    FormGroupComponent,
    CounterComponent,
    TestComponent,
  //  DraglistComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CKEditorModule,
    DragulaModule,
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  providers: [PersistanceValidationService, FieldHooksService],
  bootstrap: [AppComponent]
})
export class AppModule {}

