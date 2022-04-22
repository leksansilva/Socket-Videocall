import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public joinedId = new BehaviorSubject(null);
  public leavedId = new BehaviorSubject(null);
  public newMessage = new BehaviorSubject(null);
  private socket: Socket;

  constructor() {
    this.socket = io('localhost:3000');
    this.hanleUserConnect();
    //this.handleNewMessage();
  }

  public joinRoom(roomId: string, userId: string, username: string): void {
    this.socket.emit('join-room', roomId, userId, username);
  }

  public chat(content: string): void {
    this.socket.emit('chat', content);
  }

  private hanleUserConnect(): void {
    this.socket.on('user-connected', (userId) => {
      this.joinedId.next(userId);
    });
    this.socket.on('user-disconnected', (userId) => {
      this.leavedId.next(userId);
    });
  }

  private handleNewMessage(): void {
    this.socket.on('new-message', (content) => {
      this.newMessage.next(content);
    });
  }
}
