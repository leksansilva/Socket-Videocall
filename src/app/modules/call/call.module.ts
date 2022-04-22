import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallComponent } from './components/call/call.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatModule } from '../chat/chat.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
const callRoutes: Routes = [
  {
    path: '',
    component: CallComponent,
  },
];

@NgModule({
  declarations: [CallComponent, VideoPlayerComponent],
  imports: [
    RouterModule.forChild(callRoutes),
    CommonModule,
    ChatModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class CallModule {}
