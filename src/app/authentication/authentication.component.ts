import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  template: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor() { 
    this.resetToken();
  }

  ngOnInit(): void {
  }
  
  //reset token
  resetToken(){
    localStorage.removeItem('token');
  }

}
