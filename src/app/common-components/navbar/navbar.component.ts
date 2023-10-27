import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private readonly authService:AuthService,private readonly router:Router){
this.currentUser=new User();
  }
  currentUser!:User;
  ngOnInit(){
    this.authService.currentUser.subscribe((res)=>{
      this.currentUser.userType=res?.userType;
    });
  }

  logOut(){
    this.authService.logOut();
      }



}
