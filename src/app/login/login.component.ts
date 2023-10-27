import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { MailRequest } from 'src/core/models/request/mailrequest.model';
import { PasswordRequest } from 'src/core/models/request/password-request.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly apiService:ApiService,
  ){}

  showModal:boolean=false;
  isMailCame: boolean = false;
  isCodeCame:boolean=false;
  confirmCodeInput: string = '';
  passwordRequest:PasswordRequest=new PasswordRequest();
  message:string='';
  confirmCode: string = '';
  public loginRequest: LoginRequest = <LoginRequest>{};
  public registerRequest: RegisterRequest = <RegisterRequest>{};
  mail:MailRequest=new MailRequest();

  async login() {
    let status = await this.authService.login(this.loginRequest);

    if (status == ResponseStatus.Ok) {      
      await this.router.navigate(['profile/info']);
       location.reload();
      
    } else if (status == ResponseStatus.Invalid) {
      alert("bir hata oluştu");
      this.loginRequest.password = '';
    }

  }
  async register(){
    let status=await this.authService.register(this.registerRequest)
    if(status==ResponseStatus.Ok){
      alert("şimdi login işlemini yapabilirsiniz");
      await this.router.navigate(['login']);
       location.reload();

    }
    else{
      alert("bir hata oluştu");
    }
  }

  confirmationMail() {
    //console.log(this.mail + "mail");
    
    this.mail!.subject = "Onay Şifresi";
    this.confirmCode = this.generateVerificationCode();
    this.mail!.body = "Onay şifreniz=" + this.confirmCode + " bu şifreyi ilgili yere yazdıktan sonra kullanıcı şifrenizi değiştirebilirsiniz."
    //console.log(this.mail + "mail")
    this.apiService.sendEmail(this.mail!).subscribe(
      response => {

        //console.log('E-posta gönderildi:', response);
        this.message = 'E-posta gönderildi';
        this.isMailCame = true;
      },
      error => {
        console.error('E-posta gönderme hatası:', error);
        this.message = 'E-posta gönderilme hatası';
      }
    );
  }

  confirmCodeMethod() {
   // console.log(this.confirmCodeInput)
    if (this.confirmCode == this.confirmCodeInput) {
      this.isMailCame = false;
      this.message = 'onay kodunuz doğru şimdi şifrenizi değiştirebilirsiniz'
      this.isCodeCame=true;
      //console.log(this.mail?.recepients)      
    }
    else {
      this.message = 'onay kodunuz yanlış tekrar deneyin'
    }
  }
  async changePassword(){

    
    this.passwordRequest!.email=this.mail.recepients?.toString();
   let status=await this.apiService.changePassword(this.passwordRequest).then((response)=>
   response?.status);

   if(status==ResponseStatus.Ok){
    this.message="şifreniz değişti giriş yapabilirsiniz"
   }
   else{
    this.message="bir hata oluştu tekrar deneyin"
   }
  
    
   
  }

  generateVerificationCode(): string {
    const min = 100000; // En küçük 6 haneli sayı
    const max = 999999; // En büyük 6 haneli sayı
    const verificationCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return verificationCode.toString();
  }

 
  openModal() {
    this.message = '';
    this.showModal = true;
    this.isMailCame=false;
  }
  closeModal() {
    this.showModal = false;
    this.isMailCame = false;
    this.isCodeCame=false;
    this.passwordRequest.email='';
    this.passwordRequest.password='';
    this.mail!.body='';
    this.mail!.recepients='';
    this.mail!.subject='';



  }



}
