import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  canActivate():boolean{
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }
}