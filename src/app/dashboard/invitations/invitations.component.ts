import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../project/project.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {
  title:string="Invitations";
  projectInvitation;
  acceptProjectForm: FormGroup;
  private response;
  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {
    this.getProjectInvitationList();
   }

  ngOnInit(): void {
  }
  //method to get project invitation list
  getProjectInvitationList(){
    this.projectService.requestList()
    .subscribe((res)=>{
      this.projectInvitation = res;
      this.projectInvitation = this.projectInvitation.projectRequestList;
      // console.log(this.projectInvitation);
    })
  }
  //method to set accept form data
  setAcceptFormData(projectId){
    this.acceptProjectForm = this.fb.group({
      projectId: projectId
    });
  }
  //method to accept form data
  acceptInvitation(projectId,index){
    if(confirm('You sure about this project?')){
      this.setAcceptFormData(projectId);
      this.projectService.acceptProject(this.acceptProjectForm.value)
      .subscribe((res)=>{
        this.response = res;
        alert(this.response.message);
        this.projectInvitation.splice(index,1);
      })
    }
  }
  //method to reject invitation
  deleteInvitation(project,index){
    if(confirm('Are you sure?you want to delete this?')){
      this.projectInvitation.splice(index,1);
    }
  }

}
