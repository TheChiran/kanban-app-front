import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  title:string="Project";
  modalTitle:string="Create Project";
  projectType = [
    {name: "Select Type",value: ""},
    {name: "Personal",value: "Personal"},
    {name: "Team",value: "Team"}
  ]
  projectList = [
    {id: 1, name: "Project 1"},
    {id: 2, name: "Project 2"},
    {id: 3, name: "Project 3"},
    {id: 4, name: "Project 4"}
  ];
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

  //get project id
  getId(id){
    console.log(id);
  }
  //delete
  deleteProject(index,project){
    if(confirm('Are you sure to delete this item?')){
      this.projectList.splice(index,1);
      console.log(`Deleted - ${project.id}`);
    }
  }

}
