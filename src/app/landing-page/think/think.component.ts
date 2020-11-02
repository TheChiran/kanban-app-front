import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-think',
  templateUrl: './think.component.html',
  styleUrls: ['./think.component.scss']
})
export class ThinkComponent implements OnInit {
  header="Why Only Think?";
  contents="Make your imaginations come true. One should not be limited only with thinking.";
  constructor() { }

  ngOnInit(): void {
  }

}
