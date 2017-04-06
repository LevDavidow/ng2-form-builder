import { 
  Component, 
  OnInit, 
  Input, 
  EventEmitter, 
  Output  
} from '@angular/core';

import { Locales } from '../../models';
import { VideoProvider } from '../models';
import { VimeoService } from '../../vimeo.service';

@Component({
  selector: 'video-field',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [VimeoService]
})
export class VideoComponent implements OnInit {
  @Input() id: string;
  @Input() values: any;
  @Input() t: Locales;
  @Input() public config: any;
  @Output() update: EventEmitter<any>;

  public text: string;
  public imgUrl: string
  public valid: boolean;

  public videoProvider: VideoProvider;

  constructor (private vimeo: VimeoService) {
    this.update = new EventEmitter();
  }

  setFrameUrl(): void {
    let videoId: string;
    this.videoProvider = undefined;
    this.id = '';

    try {
      if (this.text && this.isYoutube()) {
        videoId = this.getYoutubeVideoId();
        this.imgUrl = `https://img.youtube.com/vi/${videoId}/default.jpg`
        this.videoProvider = 'youtube';
        this.valid = true;
      } else if (this.text && this.isVimeo()) {
        videoId = this.getVimeoVideoId();
        this.setVimeoThumbnail(videoId);
        this.videoProvider = 'vimeo';
        this.valid = true;
      } else {
        this.valid = false;
      }
    } catch(e) {
      this.valid = false;
    }
   
    this.id = videoId;
    
  }

  isYoutube(): boolean {
    return !!this.text.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
  }

  isVimeo(): boolean {
    return this.text.indexOf('vimeo') > -1;
  }

  getYoutubeVideoId(): string {
    const url = this.text.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    return url[1];
  }

  getVimeoVideoId(): string {
    const url = this.text;
    const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const parsed = url.match(vimeoRegex)
    return parsed[1] ? parsed[1] : '';
  }

  setVimeoThumbnail(videoId) {
     this.vimeo.getThumbnail(videoId).subscribe((url: string) => {
       this.imgUrl = url;
     })
  }

  handleUpdate() {
    
    this.setFrameUrl();

    if (this.valid) {

      this.update.emit({
        text: this.id,
        url: this.text,
        type: this.videoProvider
      });  

    }
  }

  handleTextUpdate(text) {
    this.text = text;
    this.handleUpdate();
  }

  getValues() {

    this.text =  this.values.url;
    this.videoProvider = this.values.videoProvider;
    this.id = this.values.text;

    this.setFrameUrl();
  }

  ngOnChanges(changes) {
    this.getValues();
  }

  ngOnInit() {
    this.getValues();
  }
}
