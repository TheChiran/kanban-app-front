
import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss'],
})
export class UserSettingComponent implements OnInit {
  userProfile;
  userEmail;
  userName;
  title:string = "User Setting";
  isUsernameFieldDisabled = true;
  usernameFieldSaveIconDisplay = 'none';
  isUserEmailFieldDisabled = true;
  userEmailFieldSaveIconDisplay = 'none';
  isUserNewPasswordinputFieldDisabled = true;
  userOldPasswordRowDisplay = 'none';
  userOldPasswordEditIconDisplay = 'block';
  private response;
  newUserNameForm: FormGroup;
  private newUserName;
  newUserEmailForm: FormGroup;
  private newUserEmail;
  private userOldPassword;
  private userNewPassword;
  userNewPasswordForm: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getUserProfileData();
   }

  ngOnInit(): void {
  }
  //method to get user profile
  getUserProfileData(){
    this.userService.getUserSetting()
      .subscribe((res)=>{
        this.userProfile = res;
        // console.log(this.userProfile);
        this.userEmail = this.userProfile.email;
        this.userName = this.userProfile.username;
      })
  }
  //method to enable username input field
  enableUsernameField(){
    this.isUsernameFieldDisabled = false;
    this.showUsernameFieldSaveIcon();
  }
  //method to show username field save icon
  showUsernameFieldSaveIcon(){
    this.usernameFieldSaveIconDisplay = 'block';
  }
  //method to hide username field save icon
  hideUsernameFieldSaveIcon(){
    this.usernameFieldSaveIconDisplay = 'none';
  }
  //method to disable username input field
  disableUsernameField(){
    this.isUsernameFieldDisabled = true;
    this.hideUsernameFieldSaveIcon();
  }
  //method to enable user email input field
  enableUserEmailField(){
    this.isUserEmailFieldDisabled = false;
    this.showUserEmailFieldSaveIcon();
  }
  //method to show user email field save icon
  showUserEmailFieldSaveIcon(){
    this.userEmailFieldSaveIconDisplay = 'block';
  }
  //method to hide user email save icon
  hideUserEmailFieldSaveIcon(){
    this.userEmailFieldSaveIconDisplay = 'none';
  }
  //method to disable user email input field
  disableUserEmailField(){
    this.isUserEmailFieldDisabled = true;
    this.hideUsernameFieldSaveIcon();
  }
  //enable user password field
  enableUserPassswordField(){
    this.isUserNewPasswordinputFieldDisabled = false;
    this.showUserOldPasswordRow();
    this.hideUserNewPasswordFieldEditIcon();
  }
  //disable user password form
  disableUserPasswordField(){
    this.isUserNewPasswordinputFieldDisabled = true;
    this.hideUserOldPasswordRow();
    this.showUserNewPasswordFieldEditIcon();
  }
  //method to hide new password field edit icon
  hideUserNewPasswordFieldEditIcon(){
    this.userOldPasswordEditIconDisplay = 'none';
  }
   //method to show new password field edit icon
  showUserNewPasswordFieldEditIcon(){
    this.userOldPasswordEditIconDisplay = 'block';
  }
  //method to display user old password row
  showUserOldPasswordRow(){
    this.userOldPasswordRowDisplay = 'block';
  }
  //method to hide user old password row
  hideUserOldPasswordRow(){
    this.userOldPasswordRowDisplay = 'none';
  }
  //method to set new username
  setNewUserName(newUsername){
    this.newUserName=newUsername;
  }
  //method to get new username
  getNewUserName(){
    return this.newUserName;
  }
  //method to set new username form 
  setNewUserNameForm(){
    this.newUserNameForm = this.fb.group({
      username: [`${this.getNewUserName()}`]
    })
  }
  //method to update username
  updateUserName(){
    if(confirm(`Are you sure? You want to change username`)){
      this.setNewUserNameForm();
      this.userService.updateUserName(this.newUserNameForm.value)
      .subscribe((serverResponse)=>{
        this.response = serverResponse;
        alert(this.response.message);
        this.getUserProfileData();
        this.disableUsernameField();
      })
    }
  }
  //method to set new user email
  setNewUserEmail(newUserEmail){
    this.newUserEmail=newUserEmail;
  }
  //method to get new user email
  getNewUserEmail(){
    return this.newUserEmail;
  }
  //method to set new username form 
  setNewUserEmailForm(){
    this.newUserEmailForm = this.fb.group({
      email: [`${this.getNewUserEmail()}`]
    })
  }
  //method to update user Email
  updateUserEmail(){
    if(confirm(`Are you sure? You want to change email`)){
      this.setNewUserEmailForm();
      this.userService.updateUserEmail(this.newUserEmailForm.value)
      .subscribe((serverResponse)=>{
        this.response = serverResponse;
        alert(this.response.message);
        this.getUserProfileData();
        this.disableUserEmailField();
      })
    }
  }
  //method to set user old password
  setUserOldPassword(userOldPassword){
    this.userOldPassword = userOldPassword;
  }
  //method to get user old password
  getUserOldPassword(){
    return this.userOldPassword;
  }
  //method to check user new password field if it is blank or not
  checkIsUserOldPasswordNullOrEmpty(){
    if(!this.getUserOldPassword()) return 0;
    return 1;
  }
  //method to set user new password
  setUserNewPassword(userNewPassword){
    this.userNewPassword = userNewPassword;
  }
  //method to get user new password
  getUserNewPassword(){
    return this.userNewPassword;
  }
  //method to check user new password field if it is blank or not
  checkIsUserNewPasswordNullOrEmpty(){
    if(!this.getUserNewPassword()) return 0;
    return 1;
  }
  //method to set up user new password form
  setUserNewPasswordFormToUpdate(){
    this.userNewPasswordForm = this.fb.group({
      oldPassword:[`${this.getUserOldPassword()}`],
      newPassword:[`${this.getUserNewPassword()}`
    ]
    })
  }
  //method to update user password
  updateUserPassword(){
    if(!this.checkIsUserNewPasswordNullOrEmpty() || !this.checkIsUserOldPasswordNullOrEmpty()){
      alert('Please Fill Both Fields');
    }
    else{
      if(confirm('Are you sure? You want to change your password')){
        this.setUserNewPasswordFormToUpdate();
        if(!this.checkPasswordStrength())
          alert(`Password must be mix string with lower,upper,number and special character with at least 8 characters`);
        else{
          this.userService.updateUserPassword(this.userNewPasswordForm.value)
        .subscribe((apiResponse)=>{
          this.response = apiResponse;
          alert(this.response.message);
          if(this.response.status == 204){
            // this.setUserNewPassword('');
            // this.setUserOldPassword('');
            this.userNewPasswordForm.reset();
          }
          else
            this.router.navigate(['auth']);
        })
        }
      }
    }
  }
  //method to test password strength
  checkPasswordStrength(){
    const regex = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}');
    const result = regex.test(this.getUserNewPassword());
    // console.log(result);
    return result;
  }
}
