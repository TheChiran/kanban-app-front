import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  title:string = "Project Details";
  projectList;
  newProjectTitle;
  projectTitle;
  projectName;
  createTitleSubmitted = false;
  createTitleForm: FormGroup;
  createNewContentSubmitted = false;
  createNewContentForm: FormGroup;
  newTitleForContentForm: FormGroup;
  titleDeleteForm: FormGroup;
  private response;
  private projectId;
  private titleId;
  private previousTitleId;
  private contentToChange;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) { 
    this.submitCreateTitleForm();
    this.submitCreateNewContentForm();
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.setProjectId(id);
    this.getProjectDetails(id);
    // console.log(id);
  }

  //method to get project details
  getProjectDetails(id){
    this.projectService.projectDetails(id)
    .subscribe((res)=>{
      // console.log(res);
      this.projectList = res;
      this.projectTitle = this.projectList.projectTitleList;
      this.projectName = this.projectList.name;
      // console.log(this.projectList);
    })
  }

  //method to set proejct id
  setProjectId(id){
    this.projectId = id;
  }
  //method to get proejct id
  getProjectId(){
    return this.projectId;
  }

  //method to create title form
  submitCreateTitleForm(){
    this.createTitleForm = this.fb.group({
      titleName: ['',[
        Validators.required
        // Validators.pattern('/^[A-Za-z]+$/')
      ]],
      projectId: ['']
    })
  }
  //method to get create title form
  get titleFormControl(){
    return this.createTitleForm.controls;
  }
  //method to submit new title
  createNewtitle(){
    this.createTitleSubmitted=true;
    if(!this.createTitleForm.valid){
      return false;
    }else{
      // console.log('Done');
      // this.projectList.push(this.createTitleForm.value.titleName);
      this.createTitleForm.patchValue({projectId: this.getProjectId()});
      // console.log(this.createTitleForm.value);

      this.projectService.createProjectTitle(this.createTitleForm.value)
      .subscribe((res)=>{
        this.response = res;
        alert(this.response.message);
        this.resetCreateTitleForm();
        this.getProjectDetails(this.getProjectId());
      })
    }
  }
  //method to reset create title form
  resetCreateTitleForm(){
    this.createTitleForm.reset();
  }

  //method to set title id
  setTitleId(name){
    this.titleId = "";
    this.projectTitle.map(project=>{
      if(name==project.name) this.titleId = project._id;
    })
    // this.titleId = id;
    // console.log(this.titleId);
  }
  //method to get title id
  getTitleId(){
    return this.titleId;
  }
  //method to create title form
  submitCreateNewContentForm(){
    this.createNewContentForm = this.fb.group({
      projectId: [''],
      contentTitle: ['',[
        Validators.required
        // Validators.pattern('/^[A-Za-z]+$/')
      ]],
      titleId: [''],
      titleContent: ['',[Validators.required]]
    })
  }
  //method to get create title form
  get newContentFormControl(){
    return this.createNewContentForm.controls;
  }
  //method to submit new title
  createNewContent(){
    this.createNewContentSubmitted=true;
    if(!this.createNewContentForm.valid){
      return false;
    }else{
      // console.log('Done');
      this.createNewContentForm.patchValue({projectId: this.getProjectId(), titleId: this.getTitleId()});
      this.projectService.addProjectContent(this.createNewContentForm.value)
      .subscribe((res)=>{
        this.response = res;
        alert(this.response.message);
        this.getProjectDetails(this.getProjectId());
        this.resetcreateNewContentForm();
      })
    }
  }
  //method to reset create title form
  resetcreateNewContentForm(){
    this.createNewContentForm.reset();
  }
  //method to set previous title id
  setPreviousTitleId(id,content){
    this.previousTitleId = id;
    // console.log(this.previousTitleId);
    this.filterNewTitle(id);
    // console.log(content);
    this.setContentToChange(content);
  }
  getPreviousTitleId(){
    return this.previousTitleId;
  }
  //method to filter only the available title list
  filterNewTitle(id){
    this.newProjectTitle = [];
    this.projectTitle.map((title)=>{
      if(id!=title._id) this.newProjectTitle.push({_id: title._id, name: title.name});
    });
    // console.log(this.newProjectTitle);
  }
  //method to clear filtered title list
  clearFilteredTitle(){
    this.newProjectTitle = [];
  }
  //method to set which content we want to change
  setContentToChange(content){
    this.contentToChange = content;
  }
  //get which content we want to change
  getContentToChange(){
    return this.contentToChange;
  }
  //method to set change content title value
  setChangeContentTitleForm(){
    this.newTitleForContentForm = this.fb.group({
      projectId: [`${this.getProjectId()}`],
      previousTitleId: [`${this.getPreviousTitleId()}`],
      newTitleId: [`${this.getTitleId()}`],
      titleContent: [`${this.getContentToChange()}`]
    });
  }
  //method to change title of the content
  changeContentTitle(){
    this.setChangeContentTitleForm();
    this.projectService.changeProjectContentTitle(this.newTitleForContentForm.value)
    .subscribe((res)=>{
      this.response = res;
      alert(this.response.message);
      this.getProjectDetails(this.getProjectId());
      this.newTitleForContentForm.reset();
    })
    // console.log(this.newTitleForContentForm.value);
  }
  //method to set values for delete title form
  setDeleteTitleForm(id){
    this.titleDeleteForm = this.fb.group({
      projectId: [`${this.getProjectId()}`],
      titleId: [`${id}`]
    });
  }
  deleteTitle(id){
    if(confirm(`Are you sure? You don't need this anymore?`)){
      this.setDeleteTitleForm(id);
      this.projectService.deleteProjectTitle(this.titleDeleteForm.value)
      .subscribe((res)=>{
        this.response = res;
        alert(this.response.message);
        this.getProjectDetails(this.getProjectId());
        this.titleDeleteForm.reset();
      })
    }
  }
  

}
