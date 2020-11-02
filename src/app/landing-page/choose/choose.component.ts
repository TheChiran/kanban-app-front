import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.scss']
})
export class ChooseComponent implements OnInit {
  header="Why choose us?";
  contents=["Flexibility","Portability","Afordable"];
  constructor() { }

  ngOnInit(): void {
  }

}
