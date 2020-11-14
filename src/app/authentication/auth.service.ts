import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURI = `${environment.apiURI}/auth`;
  private headers= new HttpHeaders().set('Content-Type','application/json');
  constructor( 
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }
  
  //method to sign in
  signIn(userCredentials){
    const url = `${this.apiURI}/sign-in`;
    // console.log(userCredentials);
    return this.http.post(url,userCredentials,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to sign up
  signUp(userCredentials){
    const url = `${this.apiURI}/sign-up`;
    return this.http.post(url,userCredentials,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //method to check if authenticated
  isAuthenticated(): boolean{
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
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
