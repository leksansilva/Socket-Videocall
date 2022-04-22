import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Utils from 'src/app/utils/utils';
import { CallUser, PeerService } from '../../services/peer.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css'],
})
export class CallComponent implements OnInit, AfterViewInit {
  public joinedUsers: CallUser[] = [];
  localStream!: MediaStream;
  roomId: string = '';
  isHideChat = true;
  username: string = 'user';

  constructor(
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    private peerService: PeerService
  ) {}

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
    this.peerService.openPeer(this.localStream);

    Utils.getMediaStream({ video: true, audio: false }).then((stream) => {
      this.localStream = stream;
      this.openPeer();
    });
  }

  ngAfterViewInit(): void {
    this.listenNewUser();
    this.listenLeavedUser();
  }
  joinRoom(roomId: string, userId: string, username: string): void {
    this.socketService.joinRoom(roomId, userId, username);
  }
  openPeer(): void {
    this.peerService.openPeer(this.localStream).then((myPeerId) => {
      this.joinRoom(this.roomId, myPeerId, this.username);
    });
  }
  private listenLeavedUser(): void {
    this.socketService.leavedId.subscribe((userPeerId) => {
      this.joinedUsers = this.joinedUsers.filter((x) => x.peerId != userPeerId);
    });
  }
  private listenNewUserStream(): void {
    this.peerService.joinUser.subscribe((user) => {
      if (user) {
        if (this.joinedUsers.findIndex((u) => u.peerId === user.peerId) < 0) {
          this.joinedUsers.push(user);
        }
      }
    });
  }
  private listenNewUser(): void {
    this.listenNewUserJoinRoom();
    this.listenNewUserStream();
  }
  private listenNewUserJoinRoom(): void {
    this.socketService.joinedId.subscribe((newUserId) => {
      if (newUserId) {
        this.makeCall(newUserId);
      }
    });
  }
  private makeCall(anotherPeerId: string): void {
    this.peerService.call(anotherPeerId, this.localStream);
  }
}
