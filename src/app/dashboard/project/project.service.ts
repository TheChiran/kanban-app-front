import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private URL = `${environment.apiURI}/project`;
  private headers = new HttpHeaders().set("auth-token",localStorage.getItem('token'));
  private token;
  constructor(
    private http: HttpClient
  ) {
    // this.setToken();
   }

  //method to set token
  // setToken(){
  //   this.token =  localStorage.getItem('token');
  //   console.log(this.token);
  //   this.headers;
  // }
  //method to create project
  createProject(projectName){
    const url = `${this.URL}/create`;
    return this.http.post(url,projectName,{headers: this.headers}).pipe(
      map((res)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //method to create project title
  createProjectTitle(projectTitleForm){
    const url = `${this.URL}/create/title`;
    return this.http.post(url,projectTitleForm,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to add content to project title
  addProjectContent(projectContentForm){
    const url = `${this.URL}/add/content`;
    return this.http.post(url,projectContentForm,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to change content of a project title
  changeProjectContentTitle(form){
    const url = `${this.URL}/change/content/title`;
    return this.http.post(url,form,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //method to get count total working project
  totalProjectCount(){
    const url = `${this.URL}/count`;
    // console.log('you called me');
    // console.log(this.token);
    return this.http.get(url,{headers: this.headers})
      .pipe(
        map((res: Response)=>{
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  //method to get count total project invitation
  totalProjectRequestCount(){
    const url = `${this.URL}/count/request`;
    return this.http.get(url,{headers: this.headers})
      .pipe(
        map((res: Response)=>{
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  //method to get list of title name
  projectNameList(){
    const url = `${this.URL}/name/list`;
    return this.http.get(url,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to get details of a project
  projectDetails(projectId){
    const url = `${this.URL}/details/${projectId}`;
    return this.http.get(url,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to get the list of titles of a project
  projectTitleList(formData){
    const url = `${this.URL}/title/list`;
    return this.http.post(url,formData,{headers: this.headers}).pipe(
      map((res : Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to delete a working project
  deleteProject(projectId){
    const url = `${this.URL}/delete/${projectId}`;
    return this.http.delete(url,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to delete a project title
  deleteProjectTitle(formData){
    const url = `${this.URL}/delete/title`;
    return this.http.post(url,formData,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //send inviation to a member
  inviteProject(formData){
    const url = `${this.URL}/invite`;
    return this.http.post(url,formData,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to get the list of project request
  requestList(){
    const url = `${this.URL}/request/list`;
    return this.http.get(url,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to accept project invitation
  acceptProject(formData){
    const url = `${this.URL}/accept`;
    return this.http.post(url,formData,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to reject project invitation
  rejectProject(formData){
    const url = `${this.URL}/reject`;
    return this.http.post(url,formData,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to get a list of working project
  workingProjectList(){
    const url = `${this.URL}/working/list`;
    return this.http.get(url,{headers: this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //method to add a member to a project
  addMemberToProject(formData){
    const url = `${this.URL}/add/member`;
    return this.http.post(url,formData,{headers: this.headers}).pipe(
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
    // console.log(errorMessage);
    // alert(errorMessage.message);
    alert('There was some problem');
    return throwError(errorMessage);
  }
}
