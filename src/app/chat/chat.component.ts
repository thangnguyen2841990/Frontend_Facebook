import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserToken} from '../model/user-token';
import {Chat1} from '../model/chat1';
import {AuthenticationService} from '../service/auth/authentication.service';
import {SocketService} from '../service/socket/socket.service';
import {Chat1Service} from '../service/chat1.service';
import {ActivatedRoute} from '@angular/router';
import {UserInfoService} from '../service/user-info/user-info.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('message', {static: false, read: ElementRef}) public message: ElementRef<any>;
  isOpened = false;
  content = '';
  currentUser: UserToken = {};
  listMessage: Chat1[] = [];
  size = 10;
  toId: number;
  fullname: string;
  avatar: string;
  modalRef: BsModalRef;

  constructor(private chatService: Chat1Service,
              private socketService: SocketService,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private userInfoService: UserInfoService,
              private modalService: BsModalService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.toId = +paramMap.get('id');
    });
    this.findByUserId(this.toId);
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(value => {
      this.currentUser = value;
    });
  }
  async openForm() {
    this.isOpened = true;
    if (this.currentUser) {
      this.listMessage = await this.getAllChatHistory(this.currentUser.id, this.toId);
      this.socketService.connectToChat(this.currentUser, this.message);
      this.scrollBottom();
    }
  }

  scrollBottom() {
    setTimeout(() => {
      this.message.nativeElement.scrollTop = this.message.nativeElement.scrollHeight;
    }, 1);
  }

  closeForm(): void {
    this.isOpened = false;
    this.socketService.disconnect();
  }

  async sentMessage(user: UserToken) {
    const chat: Chat1 = {
      content: this.content,
      sender: {
        id: this.currentUser.id
      },
      status: false,
      receiver: {
        id: this.toId
      }
    };
    this.socketService.sendMessage(chat);
    this.content = '';
    this.socketService.drawNewChatMessage(chat, user);
    this.scrollBottom();
  }

  getAllChatHistory(user1Id, user2Id) {
    return this.chatService.getAllChat(user1Id, user2Id).toPromise();
  }

  async loadNewData(user) {
    const element = this.message.nativeElement.scrollTop;
    if (element < 10) {
      this.size += 5;
      this.listMessage = await this.getAllChatHistory(user.id, 1);
    }
  }

  findByUserId(id) {
    this.userInfoService.getUserInfoByUserId(id).subscribe(userInfo => {
      this.fullname = userInfo.fullName;
      this.avatar = userInfo.avatar;
    });
  }

  openModalDelete(templateDelete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      templateDelete,
      Object.assign({}, {class: 'gray modal-lg'})
    );
  }

  deleteChat() {
    this.chatService.deleteChat(this.currentUser, this.toId).subscribe(() => {
      this.getAllChatHistory(this.currentUser, this.toId);
    });
  }
}
