import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  submitted:boolean = false;
  userLoginForm:FormGroup;
  private token;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.submitForm();
    // this.resetToken();
    // console.log(localStorage.getItem('token'));
    // localStorage.removeItem('token');
    // console.log(localStorage.getItem('token'));
    

   }

  ngOnInit(): void {
    localStorage.clear();
  }
  //reset token
  // resetToken(){
  //   localStorage.removeItem('token');
  // }

  //upload user form values
  submitForm(){
    this.userLoginForm = this.fb.group({
      email: ['',
      [ Validators.required,
        Validators.minLength(5),
        Validators.email
      ]],
      password: ['',
      [
        Validators.required,
        Validators.minLength(8),
      ]]
    })
  }

  //get form control
  get formControl(){
    return this.userLoginForm.controls;
  }

  //user login
  login(){
    this.submitted=true;
    if(!this.userLoginForm.valid){
      return false;
    }else{
      //do some code
      // console.log(this.userLoginForm.value);
      this.authService.signIn(this.userLoginForm.value)
        .subscribe((res)=>{
          this.resetForm();
          // console.log(res);
          this.token = res;
          localStorage.removeItem('token');
          localStorage.setItem('token',this.token.accessToken);
          
          // console.log(localStorage.getItem('token'));
          this.router.navigate(['dashboard']);
        },(error)=>{
          this.resetForm();
          alert('Something went wrong');
        })
      
    }
  }

  //reset form 
  resetForm(){
    this.userLoginForm.reset();
  }


}
