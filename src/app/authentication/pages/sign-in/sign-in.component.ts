import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  submitted:boolean = false;
  userLoginForm:FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.submitForm();
   }

  ngOnInit(): void {
  }

  //upload user form values
  submitForm(){
    this.userLoginForm = this.fb.group({
      username: ['',[Validators.required,Validators.minLength(5)]],
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
      console.log(this.userLoginForm);
      this.resetForm();
    }
  }

  //reset form 
  resetForm(){
    this.userLoginForm.reset();
  }


}
