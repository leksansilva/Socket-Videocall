import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Peer from 'peerjs';

import { environment } from '../../../../environments/environment';

export interface CallUser {
  peerId: string;
  stream: MediaStream;
}
@Injectable({
  providedIn: 'root',
})
export class PeerService {
  public joinUser = new BehaviorSubject<CallUser>(null);
  public leaveUser = new BehaviorSubject<string>(null);
  public myPeerId: string;
  public myPeer: any;

  public openPeer(stream: MediaStream): Promise<string> {
    return new Promise<string>((resolve) => {
      this.initPeer();
      this.myPeer.on('open', (id: string) => {
        this.myPeerId = id;
        this.handleInComingCall(stream);
        resolve(this.myPeerId);
      });
    });
  }
  private initPeer(): void {
    this.myPeer = new Peer(undefined, environment.peer);
  }
  public call(anotherPeerId: string, stream: MediaStream): void {
    var call = this.myPeer.call(anotherPeerId, stream);
    this.handelCall(call, anotherPeerId);
  }

  public handelCall(call: any, anotherPeerId: string): void {
    call.on('stream', (anotherStream: any) => {
      this.joinUser.next({ peerId: anotherPeerId, stream: anotherStream });
    });
  }
  private handleInComingCall(stream: MediaStream): void {
    this.myPeer.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (anotherStream: any) => {
        this.joinUser.next({ peerId: call.peer, stream: anotherStream });
      });
    });
  }
}
