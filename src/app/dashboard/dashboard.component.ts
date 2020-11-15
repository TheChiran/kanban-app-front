import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  icon ='fa fa-arrow-right mt-5 icon';
  icon1 ='fa fa-arrow-right mt-5 icon';
  icon2 ='fa fa-arrow-left mt-5 icon';
  sidenavStyle = 'side-nav';
  isActivate = false;
  constructor() {
    // console.log(localStorage.getItem('token'));
   }

  ngOnInit(): void {
  }
  activateSideNav(){
    if(this.isActivate){
      this.isActivate=false;
      this.sidenavStyle = 'side-nav';
      this.icon = this.icon1;
    }else{
      this.isActivate = true;
      this.sidenavStyle = 'active-side-nav';
      this.icon = this.icon2;
    }
    
  }

}
