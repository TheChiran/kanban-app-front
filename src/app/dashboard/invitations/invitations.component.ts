import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {
  title:string="Invitations";
  projectInvitation = [
                      {id:1,name: "Project 1", invitedBy: "chiran.tonmoy.swe@gmail.com"},
                      {id:1,name: "Project 2", invitedBy: "chiran.tonmoy.swe@gmail.com"},
                      {id:1,name: "Project 3", invitedBy: "chiran.tonmoy.swe@gmail.com"}
                      ]
  constructor() { }

  ngOnInit(): void {
  }
  acceptInvitation(project,index){

  }
  deleteInvitation(project,index){
    if(confirm('Are you sure?you want to delete this?')){
      this.projectInvitation.splice(index,1);
    }
  }

}
