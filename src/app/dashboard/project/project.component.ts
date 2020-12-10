import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from './project.service';

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
  projectList;
  submitted:boolean = false;
  projectSubmitForm:FormGroup;
  private response;
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {
    this.submitForm();
    this.getProjectNameList();
   }

  ngOnInit(): void {
  }
  submitForm(){
    this.projectSubmitForm = this.fb.group({
      projectName: ['',[Validators.required]]
      // projectType: ['',[Validators.required]]
    })
  }

  //get form control
  get formControl(){
    return this.projectSubmitForm.controls;
  }

  //method to create a new project
  create(){
    this.submitted=true;
    if(!this.projectSubmitForm.valid){
      return false;
    }else{
      //do some code
      this.projectService.createProject(this.projectSubmitForm.value)
      .subscribe((res)=>{
        this.response = res;
        alert(this.response.message);
        this.getProjectNameList();
        this.resetForm();
      }),
      (error)=>{

      }
      // console.log(this.projectSubmitForm.value);
      
    }
  }

  //reset form 
  resetForm(){
    this.projectSubmitForm.reset();
  }

  //method to get project list name
  getProjectNameList(){
    this.projectService.workingProjectList()
      .subscribe((res)=>{
        this.projectList = res;
        // console.log(this.projectList);
      }),
      (error)=>{

      }
  }
  //get project id
  getId(id){
    // console.log(id);
  }
  //delete a project
  deleteProject(index,project){
    if(confirm('Are you sure to delete this item?')){
      this.projectService.deleteProject(project._id)
      .subscribe((res)=>{
        this.response = res;
        alert(this.response.message);
        this.projectList.splice(index,1);
      }),
      (error)=>{

      }
      // console.log(`Deleted - ${project._id}`);
    }
  }

  

}
