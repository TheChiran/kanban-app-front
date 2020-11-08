import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  title:string = "Dashboard";
  createProject={name: "Create Project", link: "/dashboard/project"};
  projectList={name: "Project List", link: "/dashboard/project/list"};
  totalProject ={title: "Total Project", icon: "fa fa-file" ,count: 18};
  totalInvitation ={title: "Total Invitation", icon: "fa fa-envelope" ,count: 18};
  constructor() { }

  ngOnInit(): void {
  }

}
