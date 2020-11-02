import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  header = "KanbanBoard";
  headerContent = "Makes your project work easy by tracking up you project status."
  constructor() { }

  ngOnInit(): void {
  }

}
