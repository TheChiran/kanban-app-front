import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input('buttonLink') button;
  styles = 'btn btn-md btn-block btn-primary';
  constructor() { }

  ngOnInit(): void {
  }

}
