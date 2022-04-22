import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css'],
})
export class ChatInputComponent implements OnInit {
  public content: string = '';
  public isShowIcon = false;
  public icons = [];
  @Output() public onSubmitMessage = new EventEmitter<string>();

  ngOnInit(): void {}

  submitMessage(): void {
    if (this.content.trim().length > 0) {
      this.onSubmitMessage.emit(this.content.trim());
      this.content = '';
    }
  }

  hideOrUnhideIcon(): void {
    this.isShowIcon = !this.isShowIcon;
  }

  addIcon(indexIcon: string): void {
    this.onSubmitMessage.emit(
      `<img src='https://dblogonline.s3-ap-southeast-1.amazonaws.com/icons/funny/${indexIcon}.gif' alt='con'/>`
    );
  }
}
