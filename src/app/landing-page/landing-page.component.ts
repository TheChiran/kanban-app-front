import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // @HostListener('window:scroll', ['$event']) 
  //   scrollHandler(event) {
  //     // console.debug("Scroll Event");
  //     console.log('Scroll Called!');
  //   }

}
