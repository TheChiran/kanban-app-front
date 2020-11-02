import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-work',
  templateUrl: './team-work.component.html',
  styleUrls: ['./team-work.component.scss']
})
export class TeamWorkComponent implements OnInit {
  header="Team work is an asset";
  content="The more you work with team, the more you learn.Team work makes you more responsible."
  constructor() { }

  ngOnInit(): void {
  }

}
