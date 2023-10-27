import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { SidebarService } from 'src/service/sidebarservis.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  currentUser!: User;
  isOpen: Boolean=true;
  constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.currentUser = new User();
    this.authService.currentUser.subscribe((res)=>{
      this.currentUser.userType=res?.userType;
      this.currentUser.email=res?.email;
      
    })
  }
  ngOnInit() {
    this.isOpen = JSON.parse(SidebarService.getIsOpenLocalStorage()!);
    SidebarService.dashboardNavigationIsOpen = this.isOpen ? true : false;
    console.log(SidebarService.dashboardNavigationIsOpen)
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    this.isOpen ? sidebar.classList.add('active') : null;    
  }

  sidebarActive() {

    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    //sidebar.classList.toggle('active')
    if (SidebarService.dashboardNavigationIsOpen) {
      SidebarService.DashboardClose();
      SidebarService.setIsOpenLocalStorage(false);
      console.log(SidebarService.dashboardNavigationIsOpen)
      sidebar.classList.remove('active')

    } else {
      SidebarService.DashboardOpen();
      SidebarService.setIsOpenLocalStorage(true);
      console.log(SidebarService.dashboardNavigationIsOpen)
      sidebar.classList.add('active')
    }
  }

  logOut() {
    this.authService.logOut();

  }
}
