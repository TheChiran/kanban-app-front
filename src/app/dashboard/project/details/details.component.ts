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
  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.displayValues();
    this.getProjectTitle();
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(id);
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
