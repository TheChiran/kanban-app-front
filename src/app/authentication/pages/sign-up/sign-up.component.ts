import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  submitted:boolean = false;
  signUpForm:FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.registerForm();
   }
  projectHeadContent:string = "Track your project and grow more";

  ngOnInit(): void {
  }

  //register form
  registerForm(){
    this.signUpForm = this.fb.group({
      username: ['',[
        Validators.required,
        Validators.minLength(6)
      ]],
      email: ['',[
        Validators.required,
        Validators.email
      ]],
      password: ['',[
        Validators.required,
        Validators.minLength(8)
      ]]
    })
  }

  //get form control
  get formControl(){
    return this.signUpForm.controls;
  }

  //register method
  register(){
    this.submitted=true;
    if(!this.signUpForm.valid){
      return false;
    }else{
      //some code
      console.log(this.signUpForm.value);
      this.resetForm();
    }
  }

  //reset form
  resetForm(){
    this.signUpForm.reset();
  }


}
