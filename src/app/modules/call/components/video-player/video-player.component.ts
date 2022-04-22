import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  providers: [MediaService],
})
export class VideoPlayerComponent implements AfterViewInit, OnInit {
  @ViewChild('videoPlayer') videoElement?: any;
  @Input() mode: 'view' | 'owner' = 'view';
  @Input() stream: MediaStream;
  videoElementRef: any;
  handleWebCam: string;
  handleAudio: string;

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.mediaService.mode = this.mode;
    this.listenMediaControlChanges();
  }

  ngAfterViewInit(): void {
    this.mediaService.stream = this.stream;
    this.videoElementRef = this.videoElement.nativeElement;
    if (this.mode === 'owner') {
      this.videoElementRef.muted = true;
    }
    this.playVideo();
  }

  public turnVideoOnOrOff(): void {
    this.mediaService.turnVideoOnOrOff();
  }

  public muteOrUnMute(): void {
    this.mediaService.muteOrUnMute();
  }

  private listenMediaControlChanges(): void {
    this.mediaService.isMute.subscribe(() => {
      this.handleAudio = this.mediaService.getMicSrc();
    });
    this.mediaService.isCameraOff.subscribe(() => {
      this.handleWebCam = this.mediaService.getWebcamSrc();
    });
  }

  private playVideo() {
    if (this.videoElementRef) {
      this.videoElementRef.srcObject = this.stream;
      this.videoElementRef.play();
    }
  }
}
