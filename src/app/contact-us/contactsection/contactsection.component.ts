import { Component } from '@angular/core';
import { MailRequest } from 'src/core/models/request/mailrequest.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-contactsection',
  templateUrl: './contactsection.component.html',
  styleUrls: ['./contactsection.component.css']
})
export class ContactsectionComponent {
  email?:MailRequest;
  phone?:string;
  name?:string;
  mail?:string;
  body?:string;

  constructor(private readonly apiService:ApiService){
    this.email=new MailRequest();
  }
   
  async sendMail(){
    if(this.body!=null&&this.mail!=null&&this.name!=null&&this.phone!=null){
    this.email!.recepients="ilkersenel5797@gmail.com";
    this.email!.subject=this.mail;
    this.email!.body=this.body+' '+this.name+' tarafından gönderildi.'+' Telefon:'+this.phone;
    let status= await this.apiService.sendEmail(this.email!);
    this.email=new MailRequest();
    
    
    status.subscribe(
      
        response => {

          alert('E-posta gönderildi:');
          this.body=this.name=this.mail=this.phone='';
        },
        error => {
          alert('E-posta gönderme hatası:');
        }
    )
  }
    else{
      alert("lütfen boş alanları doldurunuz.")
    }


  }
}
