import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

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
  private dashboardMainPanelWidth = '100%';

  constructor() {
    // console.log(localStorage.getItem('token'));
    // console.log(window.innerHeight);
    // this.getBrowserHeight();
   }

  ngOnInit(): void {
    // this.getBrowserHeight();
  }
  //method to get browser present height
  @HostListener('window:resize', ['$event'])
  getBrowserHeight(){
    return window.innerHeight;
    // console.log(window.innerHeight);
  }
  getDashboardPanelWidth(){
    return this.dashboardMainPanelWidth;
  }
  //to dynamically change padding bottom
  private padding_bottom = "75em";
  getPaddingBottomValue(){
    return this.padding_bottom;
  }
  //to change content portion width according to need
  contentPortionDisplay;
  activateSideNav(){
    if(this.isActivate){
      this.isActivate=false;
      this.sidenavStyle = 'side-nav';
      this.contentPortionDisplay = 'content-display-width-inactive';
      this.icon = this.icon1;
    }else{
      this.isActivate = true;
      this.sidenavStyle = 'active-side-nav';
      this.contentPortionDisplay = 'content-display-width-active';
      this.icon = this.icon2;
      
    }
    
  }

  

}
