import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  title:string = "Project Details";
  projectList = [
    {title: "ToDo",contents: ['Research','Work']},
    {title: "Doing",contents: ['Research','Work']},
    {title: "Research",contents: ['Research','Work']}
  ]
  projectTitle = [];

  createTitleSubmitted = false;
  createTitleForm: FormGroup;
  createNewContentSubmitted = false;
  createNewContentForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.displayValues();
    this.getProjectTitle();
    this.submitCreateTitleForm();
    this.submitCreateNewContentForm();
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(id);
  }

  //method to create title form
  submitCreateTitleForm(){
    this.createTitleForm = this.fb.group({
      titleName: ['',[
        Validators.required
        // Validators.pattern('/^[A-Za-z]+$/')
      ]]
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
      this.projectList.push(this.createTitleForm.value.titleName);
      this.resetCreateTitleForm();
    }
  }
  //method to reset create title form
  resetCreateTitleForm(){
    this.createTitleForm.reset();
  }
  //method to create title form
  submitCreateNewContentForm(){
    this.createNewContentForm = this.fb.group({
      contentName: ['',[Validators.required]],
      contentTitle: ['',[
        Validators.required
        // Validators.pattern('/^[A-Za-z]+$/')
      ]]
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
      this.resetcreateNewContentForm();
    }
  }
  //method to reset create title form
  resetcreateNewContentForm(){
    this.createNewContentForm.reset();
  }
  displayValues(){
    // console.log(this.projectList);
  }
  contentName:string;
  previousTitle:string;
  newTitle:string;
  setName(name,previousTitle){
    // console.log(name);
    this.contentName = name;
    this.setPreviousTitle(previousTitle);
  }
  setTitle(title){
    // console.log(title);
    this.newTitle = title;
  }
  setPreviousTitle(title){
    // console.log(title);
    this.previousTitle = title;
  }
  getProjectTitle(){
    this.projectList.map((project)=>{
      this.projectTitle.push(project.title);
    })
    // console.log(this.projectTitle);
  }
  changeContentTitle(){
    // this.removeFromPrevious(this.previousTitle,this.contentName);
    this.addToNew(this.newTitle,this.contentName);
  }
  removeFromPrevious(title,name){
    // this.projectList.reduce(title[title].contents[name]);
  }
  addToNew(title,name){
    // this.projectList.push(name);

  }

}
