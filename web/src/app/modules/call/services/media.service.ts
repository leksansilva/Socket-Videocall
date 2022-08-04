import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MediaService {
  stream: MediaStream;
  isMute = new BehaviorSubject(false);
  isCameraOff = new BehaviorSubject(false);
  mode: 'view' | 'owner' = 'view';

  muteOrUnMute(): void {
    if (this.stream) {
      this.isMute.next(!this.isMute.getValue());
      this.stream.getAudioTracks()[0].enabled = !this.isMute.getValue();
    }
  }
  turnVideoOnOrOff(): void {
    if (this.stream) {
      this.isCameraOff.next(!this.isCameraOff.getValue());
      this.stream.getVideoTracks()[0].enabled = !this.isCameraOff.getValue();
    }
  }
  getMicSrc(): string {
    if (this.mode === 'owner') {
      return this.isMute.getValue() ? 'Abrir Microfone' : 'Fechar Microfone';
    }
    return this.isMute.getValue() ? 'Abrir Áudio' : 'Fechar Áudio';
  }

  public getWebcamSrc(): string {
    return this.isCameraOff.getValue() ? 'Abrir Camera' : 'Fechar Camera';
  }
}
