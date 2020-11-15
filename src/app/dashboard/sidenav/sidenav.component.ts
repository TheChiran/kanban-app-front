import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  navLinks = [
    {"name": "Dashboard", "link": "/dashboard", 
    "icon": 'fa fa-tachometer'},
    {"name": "Project", "link": "/dashboard/project", 
    "icon": `fa fa-rocket`},
    {"name": "Invitations", "link": "/dashboard/invitations", 
    "icon": 'fa fa-list'}
  ];
  button = {name: 'Logout', link: '/logout', isBlock: true};
  userProfile;
  constructor(
    private userService: UserService
  ) { 
    this.getUserProfile();
  }

  ngOnInit(): void {
  }

  
//method to get user information
  getUserProfile(){
    this.userService.getUserProfile()
    .subscribe((res)=>{
      this.userProfile = res;
      this.userProfile = this.userProfile.user;
      // console.log(this.userProfile);
    }),
    (error)=>{
      //manage error
    }
  }

}
