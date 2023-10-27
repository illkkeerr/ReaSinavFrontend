import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { AccountHistoryRequest } from 'src/core/models/request/accountHistory-request.model';
import { BalanceRequest } from 'src/core/models/request/balance-request.model';
import { UserRequest } from 'src/core/models/request/user-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private readonly apiService: ApiService) {
    this.currentUser = new User();
   this.getProfileInfo();
 
    this.userRequest=new UserRequest();
    this.getAllUsers();
  }
  accountHistory:AccountHistoryRequest=new AccountHistoryRequest()
  currentUser!: User;
  userRequest!:UserRequest;
  isOpen = false;
  isOpenSend=false;
  selectedUserId:any=-1;
  allUsers:User[]=[];
  customerBalance:BalanceRequest=new BalanceRequest();
  receiverBalance:BalanceRequest=new BalanceRequest();

async getProfileInfo(){
  await this.apiService.getProfileInfo().subscribe((res) => {
    this.currentUser = res.data;      
  })
}

 async getAllUsers(){
await this.apiService.getAllEntities(User).subscribe((res)=>{
  this.allUsers=res.data;
})
  }

  openModal() {
   this.isOpen=true;
   
  }
  openSend(){
    this.isOpenSend=true;
    this.getAllUsers();
  }
  closeAllModal(){
    this.isOpenSend=false;
  }
  selectUser(){
    document
    .getElementById('selectType')
    ?.addEventListener('click', (event) => {
      this.selectedUserId = Number(
        (event.target as HTMLInputElement).value
      );
    });
  }
  async sendMoney(){
   
    this.accountHistory.customerId=this.currentUser.id;
    this.accountHistory.processType=2;
    this.accountHistory.receiverId=this.selectedUserId;
    this.customerBalance.id=this.currentUser.id;
    this.customerBalance.amountOfMoney=this.accountHistory.amountOfMoney*-1;
    this.receiverBalance.id=this.accountHistory.receiverId;
    this.receiverBalance.amountOfMoney=this.accountHistory.amountOfMoney;
    //console.log(this.accountHistory)
    //console.log(this.customerBalance)
    //console.log(this.receiverBalance)
    await this.apiService.createEntity(this.accountHistory,'AccountHistory').then((res)=>{
      
      if(res?.status==ResponseStatus.Ok){
         this.apiService.changeBalance(this.customerBalance);
         this.apiService.changeBalance(this.receiverBalance);
         alert("para gönderildi");
         this.closeAllModal();
         this.getProfileInfo();
      


        
      }
      else{
        alert("bir hata oluştu");
      }
    })
  }
  async closeModal() {
    this.isOpen = false;
    await this.apiService.getProfileInfo().subscribe((res) => {
      this.currentUser = res.data;      
    })
  }
  updateProfile(){
    this.userRequest.email=this.currentUser.email;
    this.userRequest.fullName=this.currentUser.fullName;
    this.userRequest.userType=this.currentUser.userType;
    

    this.apiService.updateEntity(this.currentUser.id,this.userRequest,User).then((res)=>{
      if(res?.status==ResponseStatus.Ok){
        alert("güncelleme başarılı");
      }
      else{
        alert("güncelleme başarısız");
      }
    })
  }
}
