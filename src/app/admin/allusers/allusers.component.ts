import { Component } from '@angular/core';
import { CreateUserRequest } from 'src/core/models/request/createUser-request.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { UserRequest } from 'src/core/models/request/user-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent {
  users: User[] = [];
  userRequest: UserRequest = new UserRequest();
  user: User = new User();
  isUpdateModal: boolean = false;
  isAddModal: boolean = false;
  selectedUserType: any = -1;
  currentUser!:User;
  public registerRequest: CreateUserRequest=new CreateUserRequest();
  constructor(private readonly service: ApiService,private readonly auth:AuthService) { }
  async ngOnInit() {
    await this.getAllUsers();
    this.service.getProfileInfo().subscribe((res)=>{
      this.currentUser=res.data;
    })

  }
  async getAllUsers() {
    await this.service.getAllEntities(User).subscribe((res) => {
      this.users = res.data;
      this.users=this.users.sort((a, b) => a.id - b.id);
    })
  }
  deleteUser(id: any) {
    let confirm = window.confirm("Silmek istiyor musunuz?");
    if (confirm) {
      let status = this.service.deleteEntity(id, User);
      status.then((res) => {
        if (res?.status == ResponseStatus.Ok) {
          alert("Silme başarılı");
          this.getAllUsers();
        }
        else {
          alert("bir hata oluştu");
        }
      });
    }


  }
  openModalAdd() {
this.isAddModal=true;

  }
  openModalUpdate(user: User) {
    this.isUpdateModal = true
    this.user = user;


  }
  closeModal() {
    this.isUpdateModal = false;
    this.isAddModal = false;
  }
  selectUseTypeOnModal() {
    document
      .getElementById('selectType')
      ?.addEventListener('click', (event) => {
        this.selectedUserType = Number(
          (event.target as HTMLInputElement).value
        );
      });
  }

  async updateUser() {
    this.userRequest.email = this.user.email;
    this.userRequest.fullName = this.user.fullName;
    this.userRequest.userType=this.selectedUserType;
    this.userRequest.balance=this.user.balance;
   await this.service.updateEntity(this.user.id,this.userRequest,User).then((res)=>{
      if(res?.status==ResponseStatus.Ok){
        alert("güncelleme başarılı");
        this.getAllUsers();
        this.closeModal();
        this.selectedUserType=-1;
      }
      else{
        alert("bir hata oluştu");
        
      }
      
    })
  }

  async addUser(){
    console.log('çalıştır')
    /*await this.service.createEntity(this.registerRequest,'User').then((res)=>{
      if(res?.status==ResponseStatus.Ok){
        alert("Kullanıcı Eklendi");        
        this.getAllUsers();
        this.closeModal();
      }
      else{
        alert("bir hata oluştu");
      }
    })*/
    
    await this.service.createUser(this.registerRequest).then((res)=>{

      if(res?.status==ResponseStatus.Ok){
        alert("Kullanıcı Eklendi");        
        this.getAllUsers();
        this.closeModal();  
      }
      else{
        alert("bir hata oluştu");
      }
    })
    
      
  
  
      
      
}}


