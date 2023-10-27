import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NavbarComponent } from './common-components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { HomeSliderComponent } from './home/home-slider/home-slider.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { ServicesComponent } from './our-services/services/services.component';
import { AboutComponent } from './about/about.component';
import { AboutsectionComponent } from './about/aboutsection/aboutsection.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactsectionComponent } from './contact-us/contactsection/contactsection.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from 'src/core/services/interceptor/jwt.interceptor';
import { ErrorComponent } from './common-components/error/error.component';
import { AllusersComponent } from './admin/allusers/allusers.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './admin/history/history.component';
import { MyHistoryComponent } from './admin/my-history/my-history.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    HomeSliderComponent,
    OurServicesComponent,
    ServicesComponent,
    AboutComponent,
    AboutsectionComponent,
    ContactUsComponent,
    ContactsectionComponent,
    LoginComponent,
    ErrorComponent,
    AllusersComponent,
    MessagesComponent,
    HistoryComponent,
    MyHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
    
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
