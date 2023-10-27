import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './common-components/error/error.component';
import { adminControl, loginControl, } from './admin-control';
import { AllusersComponent } from './admin/allusers/allusers.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { HistoryComponent } from './admin/history/history.component';
import { MyHistoryComponent } from './admin/my-history/my-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home page
  { path: 'home', component: HomeComponent },
  { path: 'ourservices', component: OurServicesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  {
    path: 'profile',
    component: AdminComponent, canActivate:[loginControl],
    children: [
      { path: 'info', component: DashboardComponent },
      { path:'allusers',component:AllusersComponent, canActivate:[adminControl], },
      { path:'messages',component:MessagesComponent, canActivate:[loginControl], },
      { path:'all-history',component:HistoryComponent, canActivate:[adminControl], },
      { path:'my-history',component:MyHistoryComponent, canActivate:[loginControl], },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  

})
export class AppRoutingModule { }
