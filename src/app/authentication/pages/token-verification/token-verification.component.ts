import { Router } from '@angular/router';
import { UserService } from './../../../dashboard/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-token-verification',
  templateUrl: './token-verification.component.html',
  styleUrls: ['./token-verification.component.scss']
})
export class TokenVerificationComponent implements OnInit {
  private verificationTokenFormDisplay;
  private resetPasswordDisplay = 'none';
  private verificationCode = '';
  private resetPasswordFormGroup: FormGroup;
  private newPassword;
  private response;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { 
    this.setVerificationTokenDisplayStyle('block');
    this.setResetPasswordDisplayStyle('none');
  }

  ngOnInit(): void {
  }

  setVerificationTokenDisplayStyle(style:string){
    this.verificationTokenFormDisplay = style;
  }

  getVerificationTokenDisplayStyle(){
    return this.verificationTokenFormDisplay;
  }

  setResetPasswordDisplayStyle(style:string){
    this.resetPasswordDisplay = style;
  }

  getResetPasswordDisplayStyle(){
    return this.resetPasswordDisplay;
  }
  setVerificationCode(code){
    this.verificationCode = code;
  }

  getVerificationCode(){
    return this.verificationCode;
  }

  checkVerificationCode(){
    if(this.getVerificationCode() == ''){
      Swal.fire("Opps!","You forgot to provide verification code!","warning")
    }else{
      if(parseInt(this.getVerificationCode()) == parseInt(localStorage.getItem('verificationcode'))){
        Swal.fire("Great!","You can reset your password now!","success");
        this.setResetPasswordDisplayStyle('block');
        this.setVerificationTokenDisplayStyle('none');
      }else{
        Swal.fire("Sorry!","Your provided code dosen't match","error")
      }
    }
  }

  //method to reset password
  resetPassword(){
    if(!this.checkPasswordStrength()){
      Swal.fire("Sorry!","You must provide strong password with at least 8 charcters including number,lower,upper and special characters","warning");
    }else{
      // Swal.fire("Good!","Password reset succesful!","Success");
      this.setResetPasswordFormValues();
      this.userService.resetPassword(this.resetPasswordFormGroup.value)
      .subscribe((res)=>{
        // this.response = res;
        Swal.fire("Success!","Password reset done!","success");
        localStorage.clear();
        this.router.navigate(['auth']);
      },
      (error)=>{
        Swal.fire("Sorry!","Something unexpected happened!","error");
      }
      )
    }
  }
  //method to set new passowrd
  setNewPassword(newPassword: string){
    this.newPassword = newPassword;
  }
  //method to get new password
  getNewPassword(){
    return this.newPassword;
  }
  //method to set reset password form
  setResetPasswordFormValues(){
    this.resetPasswordFormGroup = this.fb.group({
      userEmail: localStorage.getItem('userEmail'),
      newPassword: this.getNewPassword()
    })
  }
  //check if password is strong
  checkPasswordStrength(){
        let isStrong = /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/.test(this.getNewPassword());
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        if(!isStrong){
          return false;
        }
        return true;
  }

}
