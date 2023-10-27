/*Bu ApiService, Angular uygulamasının sunucuyla iletişim kurmasını sağlar
ve AuthService tarafından kullanılarak kullanıcı girişi, kaydı, token yenileme ve profil
 bilgisi alma gibi işlemleri gerçekleştirir. */

import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, share } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { BaseDataResponse } from '../../models/response/base-data-response.model';
import { TokenResponse } from '../../models/response/token-response.model';
import { LoginRequest } from '../../models/request/login-request.model';
import { RegisterRequest } from '../../models/request/register-request.model';
import { User } from '../../models/user.model';
import { BaseResponse } from 'src/core/models/response/base-response.model';
import { MailRequest } from 'src/core/models/request/mailrequest.model';
import { PasswordRequest } from 'src/core/models/request/password-request.model';
import { BalanceRequest } from 'src/core/models/request/balance-request.model';
import { CreateUserRequest } from 'src/core/models/request/createUser-request.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private endpoint = environment.api_url;




  public profilebar?: boolean;

  //constructor fonksiyonu, HttpClient nesnesini enjekte eder ve HTTP isteklerini yapmak için kullanır.

  constructor(private readonly http: HttpClient) { console.log("Api Yenilendi"); }

  //login fonksiyonu, kullanıcı giriş isteğini gerçekleştirir.
  // HttpClient.post fonksiyonunu kullanarak API'ye LoginRequest nesnesini ve isteği yapar.

  login(request: LoginRequest): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .post<BaseDataResponse<TokenResponse>>(
        this.endpoint + '/Auth/Login',
        request
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  //register fonksiyonu, kullanıcı kayıt isteğini gerçekleştirir.
  // HttpClient.post fonksiyonunu kullanarak API'ye RegisterRequest nesnesini ve isteği yapar.

  register(
    request: RegisterRequest
  ): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .post<BaseDataResponse<TokenResponse>>(
        //ENDPOINT DEĞİŞECEK (/signin olacak)
        this.endpoint + '/Auth/Register',
        request
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  //refreshToken fonksiyonu, token yenileme isteğini gerçekleştirir.
  //HttpClient.get fonksiyonunu kullanarak API'ye token parametresini içeren bir istek gönderir.

  refreshToken(token: string): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .get<BaseDataResponse<TokenResponse>>(
        this.endpoint + '/Auth/RefreshToken',
        { params: new HttpParams().append('token', token) }
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  //getProfileInfo fonksiyonu, kullanıcının profil bilgilerini almak için bir istek gönderir.
  //HttpClient.get fonksiyonunu kullanarak API'ye istek gönderir

  getEntityById<TEntity>(id: number, entityType: Type<TEntity>) {
    return this.http.get<BaseDataResponse<TEntity>>
      (`${environment.api_url}/${entityType.name}/GetById?id=${id}`)
      .pipe(share()).toPromise();
  }


  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.http.post<BaseDataResponse<TEntity[]>>
      (environment.api_url + "/" + entityType + "/Create", entity)
      .pipe(share()).toPromise();
  }

  deleteEntity<TEntity>(id: number, entityType: Type<TEntity>) {
    return this.http.delete<BaseResponse>
      (environment.api_url + "/" + entityType.name + "/Delete?id=" + id)
      .pipe(share()).toPromise();
  }

  updateEntity<TEntity>(id: number, newEntity: TEntity, entityType: Type<TEntity>) {
    return this.http.put<BaseDataResponse<TEntity[]>>
      (environment.api_url + "/" + entityType.name + "/Update?id=" + id, newEntity)
      .pipe(share()).toPromise();
  }



  //Profil Getir
  getProfileInfo(): Observable<BaseDataResponse<User>> {
    return this.http
      .get<BaseDataResponse<User>>(this.endpoint + '/Auth/GetProfileInfo')
      .pipe(
        map((result) => {
          return result;
        })
      );
  }


  getAllEntities<TEntity>(entityType: Type<TEntity>) {
    return this.http.request<BaseDataResponse<TEntity[]>>
      ("get", environment.api_url + "/" + entityType.name + "/GetAll").pipe(share());
  }





  sendEmail(emailRequest: MailRequest): Observable<any> {

    return this.http.post(`${this.endpoint}/mail`, emailRequest);
  }
  /*localhost:5258/api/User/ChangePassword*/
  
  changePassword(passwordRequest: PasswordRequest) {
    return this.http.put<BaseDataResponse<User>>(`${this.endpoint}/User/ChangePassword`, passwordRequest)
      .pipe(share()).toPromise();
  }

  changeBalance(balanceRequest:BalanceRequest){
    return this.http.put<BaseDataResponse<User>>(`${this.endpoint}/User/ChangeBalance`, balanceRequest)
    .pipe(share()).toPromise();
  }

  createUser(user:CreateUserRequest){
    return this.http.post<BaseDataResponse<User>>(`${this.endpoint}/User/CreateUser`, user)
    .pipe(share()).toPromise();
}
  }


