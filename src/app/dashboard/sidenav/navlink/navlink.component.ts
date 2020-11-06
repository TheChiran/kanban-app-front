import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navlink',
  templateUrl: './navlink.component.html',
  styleUrls: ['./navlink.component.scss']
})
export class NavlinkComponent implements OnInit {

  @Input('links') links: [];
  title:string;
  setTitle(title){
    this.title = title;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
