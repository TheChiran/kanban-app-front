
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project/project.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  title:string = "Dashboard";
  createProject={name: "Create Project", link: "#"};
  projectList={name: "Project List", link: "/dashboard/project"};
  totalProject ={title: "Total Project", icon: "fa fa-file"};
  totalInvitation ={title: "Total Invitation", icon: "fa fa-envelope"};
  
  modalTitle:string="Create Project";
  projectType = [
    {name: "Select Type",value: ""},
    {name: "Personal",value: "Personal"},
    {name: "Team",value: "Team"}
  ];
  submitted:boolean = false;
  projectSubmitForm:FormGroup;
  totalProjectCount;
  totalProjectRequestCount;
  
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {
    this.submitForm();
    // console.log(localStorage.getItem('token'));
    this.getTotalProjectRequest();
    this.getTotalWorkingProject();
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

  //method to get total project request
  getTotalProjectRequest(){
    this.projectService.totalProjectCount()
    .subscribe((res)=>{
      this.totalProjectCount = res;
      this.totalProjectCount = this.totalProjectCount.total;
      // console.log(res);
      // console.log(localStorage.getItem('token'));
    },
    (error)=>{

    }
    )
  }

  //method to get total project request
  getTotalWorkingProject(){
    this.projectService.totalProjectRequestCount()
    .subscribe((res)=>{
      // console.log(res);
      this.totalProjectRequestCount = res;
      this.totalProjectRequestCount = this.totalProjectRequestCount.total;

    },
    (error)=>{
      //manage error
    }
    )
  }

  
  

}
