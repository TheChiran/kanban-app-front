import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { TokenVerificationComponent } from './pages/token-verification/token-verification.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    LogoutComponent,
    ResetpasswordComponent,
    TokenVerificationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
