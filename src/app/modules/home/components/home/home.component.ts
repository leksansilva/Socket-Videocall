import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Utils from 'src/app/utils/utils';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  createRoom(): void {
    const roomId = Utils.genRoomId();
    this.router.navigateByUrl(`/call/${roomId}`);
  }
  constructor(private router: Router) {}
}
