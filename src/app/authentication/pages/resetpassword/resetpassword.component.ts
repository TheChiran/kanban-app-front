import { UserService } from './../../../dashboard/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  
  emailSubmitted = false;
  emailFormGroup: FormGroup;
  private response;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { 
    this.emailForm();
  }

  ngOnInit(): void {
  }

  //email form 
  emailForm(){
    this.emailFormGroup = this.fb.group({
      email: ['',
      [
        Validators.required,
        Validators.email
      ]
    ]
    })
  }

  //method to get email form group controls
  get emailFormControl(){
    return this.emailFormGroup.controls;
  }
  

  sendEmail(){
    this.emailSubmitted = true;
    if(!this.emailFormGroup.valid){
      return false;
    }else{
      // this.router.navigate(['/auth/token-verification']);
      this.userService.requestResetToken(this.emailFormGroup.value)
      .subscribe((res)=>{
        Swal.fire("Great!","Please check your email!","success");
        this.response = res;
        localStorage.setItem('verificationcode',this.response.verificationCode);
        localStorage.setItem('userEmail',this.response.userEmail);
        this.router.navigate(['/auth/token-verification']);
      },
      (error)=>{
        Swal.fire("Sorry!","This user is invalid!Please provide valid email!","warning");
      }
      )
    }
  }

}
