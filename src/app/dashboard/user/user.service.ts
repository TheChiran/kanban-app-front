import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = `${environment.apiURI}/user`;
  private headers;
  private token;
  constructor(
    private http: HttpClient
  ) {
    this.setToken();
   }

  //method to set token
  setToken(){
    this.token =  localStorage.getItem('token');
    // console.log(this.token);
    this.headers =  new HttpHeaders().set("auth-token",this.token);
  }
  //method to get user detail
  getUserProfile(){
    const url = `${this.URL}/profile`;
    return this.http.get(url,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to get username
  getUserName(){
    const url = `${this.URL}/get/username`;
    return this.http.get(url,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to get user setting
  getUserSetting(){
    const url = `${this.URL}/setting`;
    return this.http.get(url,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to update user name
  updateUserName(newUserNameFormData){
    const url = `${this.URL}/update/username`;
    return this.http.patch(url,newUserNameFormData,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to update user email
  updateUserEmail(newUserEmailFormData){
    const url = `${this.URL}/update/email`;
    return this.http.patch(url,newUserEmailFormData,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to update user email
  updateUserPassword(newUserPasswordFormData){
    const url = `${this.URL}/update/password`;
    return this.http.patch(url,newUserPasswordFormData,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //request reset password token
  requestResetToken(userForm){
    const url = `${this.URL}/request/reset/token`;
    return this.http.post(url,userForm,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  
  //method to reset password
  resetPassword(userForm){
    const url = `${this.URL}/reset/password`;
    return this.http.post(url,userForm,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
