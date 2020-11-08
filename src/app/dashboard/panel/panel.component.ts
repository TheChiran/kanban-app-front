import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  title:string = "Dashboard";
  createProject={name: "Create Project", link: "#"};
  projectList={name: "Project List", link: "/dashboard/project"};
  totalProject ={title: "Total Project", icon: "fa fa-file" ,count: 18};
  totalInvitation ={title: "Total Invitation", icon: "fa fa-envelope" ,count: 18};
  
  modalTitle:string="Create Project";
  projectType = [
    {name: "Select Type",value: ""},
    {name: "Personal",value: "Personal"},
    {name: "Team",value: "Team"}
  ]
  submitted:boolean = false;
  projectSubmitForm:FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.submitForm();
   }

  ngOnInit(): void {
  }
  submitForm(){
    this.projectSubmitForm = this.fb.group({
      projectName: ['',[Validators.required]],
      projectType: ['',[Validators.required]]
    })
  }

  //get form control
  get formControl(){
    return this.projectSubmitForm.controls;
  }

  //user login
  create(){
    this.submitted=true;
    if(!this.projectSubmitForm.valid){
      return false;
    }else{
      //do some code
      // console.log(this.projectSubmitForm.value);
      this.resetForm();
    }
  }

  //reset form 
  resetForm(){
    this.projectSubmitForm.reset();
  }

}
