import { Component} from '@angular/core';
import { interval } from 'rxjs';
import { Message } from 'src/core/models/message.model';
import { MessageRequest } from 'src/core/models/request/messageRequest';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  istekAbone:any;
  users: User[] = [];
  messages: Message[] = [];
  isOpen: boolean = false;
  currentUser:User=new User();
  otherUser:User=new User();
  messageRequest:MessageRequest=new MessageRequest();
  constructor(private readonly apiService: ApiService) { }

   ngOnInit() {
   this.apiService.getProfileInfo().subscribe((res)=>{
      this.currentUser=res.data;
      
      this.getAllUsers();
    })
   
  
  }
  async getAllUsers() {
   await this.apiService.getAllEntities(User).subscribe((res) => {
      this.users = res.data;
      this.users=this.users.filter(f=>f.id!=this.currentUser.id);
      this.users=this.users.sort((a, b) => a.id - b.id);
     
    })
  }
  async getAllMessages(id: any) {
   await this.apiService.getAllEntities(Message).subscribe((res) => {
     this.messages = res.data.filter(f => (f.firstUserId == id&&f.secondUserId==this.currentUser.id)||(f.secondUserId==id&&f.firstUser?.id==this.currentUser.id))
      // console.log("çalıştı");
      // console.log(this.messages);
    })
  }
  openModal(item: User) {
    this.otherUser=item;
    this.isOpen = true;
    this.getAllMessages(item.id);
    this.istekAbone=interval(4000).subscribe(() => {
        this.getAllMessages(item.id);
         this.isOpen = true;
         console.log("tetikleme")
      });
    
  }
  closeModal() {
    this.isOpen = false;
    if (this.istekAbone) {
      this.istekAbone.unsubscribe(); // Abonelemeyi durdur
    }
    
  }

  async sendMessage(){
    this.messageRequest.firstUserId=this.currentUser.id;
    this.messageRequest.secondUserId=this.otherUser.id
    await this.apiService.createEntity(this.messageRequest,'Message');
   await this.getAllMessages(this.currentUser.id);
   this.openModal(this.otherUser);

  }

}
