import { UserService } from './../../user/user.service';
import { ChatService } from './../../chat/chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import {io} from 'socket.io-client';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private url = 'http://localhost:3000';
  private socket;

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
  inviteMemberSubmitted = false;
  inviteMemberForm: FormGroup;
  private response;
  private projectId;
  private titleId;
  private previousTitleId;
  private contentToChange;
  users=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private chatService: ChatService,
    private userService: UserService
  ) { 
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.setProjectId(id);
    this.getProjectDetails(id);
    this.submitCreateTitleForm();
    this.submitCreateNewContentForm();
    this.inviteMemberFormGroup();
    
    // this.chatService.newUserJoined()
        // .subscribe(data=> this.users.push(data));
    this.chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));
    this.chatService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));
    // console.log(this.projectName);
  }
  messages:string[] = [];
  userObject;
  retriveUserName(){
    this.userService.getUserName()
    .subscribe((res)=>{
      this.userObject = res;
      this.setUserName(this.userObject.user);
      this.join();
      // console.log(this.userObject);
    })
  }
  //method to get project details
  getProjectDetails(id){
    this.projectService.projectDetails(id)
    .subscribe((res)=>{
      // console.log(res);
      this.projectList = res;
      this.projectTitle = this.projectList.projectTitleList;
      this.projectName = this.projectList.name;
      this.setChatRoom(this.projectName);
      this.retriveUserName();
      // console.log(this.userObject);
      // console.log(this.projectName);
      // console.log(this.projectList);
    })
    // console.log(this.projectName);

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
  //method to delete a title
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

  //method to create invite member form
  inviteMemberFormGroup(){
    this.inviteMemberForm = this.fb.group({
      recieverEmail: ['',[
        Validators.required,
        Validators.email,
        Validators.min(6)
      ]],
      projectName: [''],
      projectId: ['']
    })
  }
  //method to get create title form
  get inviteMemberFormControl(){
    return this.inviteMemberForm.controls;
  }
  //method to submit invitation member email
  sendInvitation(){
    this.inviteMemberSubmitted = true;
    if(!this.inviteMemberForm.valid) return false;
    else{
      this.inviteMemberForm.patchValue({projectName: this.projectName,projectId: this.getProjectId()});
      // console.log(this.inviteMemberForm.value);
      this.projectService.inviteProject(this.inviteMemberForm.value)
      .subscribe((res)=>{
        this.response = res;
        alert(this.response.message);
        this.inviteMemberForm.reset();
      })
    }
  }

  private messageBoxDisplayStyle:string = 'none';
  private messageBoxiconDisplayStyle:string = 'block';

  //method to change message box display style
  setMessageBoxDisplayStyle(messageBoxDisplayCss){
    this.messageBoxDisplayStyle = messageBoxDisplayCss;
  }
  //method to get message box display style
  getMessageBoxDisplayStyle(){
    return this.messageBoxDisplayStyle;
  }
  //method to change message box display style
  setMessageIconBoxDisplayStyle(messageBoxDisplayCss){
    this.messageBoxiconDisplayStyle = messageBoxDisplayCss;
  }
  //method to get message box display style
  getMessageIconBoxDisplayStyle(){
    return this.messageBoxiconDisplayStyle;
  }
  //method to open chat box
  openChatBox(){
    // console.log('Clicked');
    this.setMessageIconBoxDisplayStyle('none');
    this.setMessageBoxDisplayStyle('block');
  }
  //method to close chat box
  closeChatBox(){
    this.setMessageIconBoxDisplayStyle('block');
    this.setMessageBoxDisplayStyle('none');
  }

  message:string;
  // setChatMessage(message){
  //   this.message = message;
  // }
  getChatMessage(){
    return this.message;
  }
  // //method to send message
  // // sendMessage(){
  // //   // console.log(this.getChatMessage());
  // //   this.chatService.sendMessage(this.getChatMessage());
  // //   // this.setChatMessage('');
  // //   this.message = '';
  // // }
  // users=[];
  // setUpConnection(){
  //   this.socket = io(this.url);
  //   this.socket.on('message-broadcast',(message:string,user:string)=>{
  //     if(message){
  //       // console.log(user);
  //       this.users.push(user);
  //       this.messages.push(message);
  //     }
  //   })
  // }
  // sendMessage(){
  //   this.socket.emit('new-message',this.getChatMessage(),'chiranSWE');
  //   this.message = '';
  // }

  ngOnInit() {
  //   // console.log(id);
  //   // this.chatService
  //   //   .getMessages()
  //   //   .subscribe((message: string) => {
  //   //     this.messages.push(message);
  //   //   });
  //   // console.log(this.messages);
  //   // this.chatService.setUpConnection();
  //   this.setUpConnection();
  //   // let newMessage = this.chatService.getMessages();
  //   // this.messages.push(newMessage);
  //   // console.log(this.messages);
  }
  private user:String; //variable to assign user name
  private chatRoom:String; //variable to assign chat room name
  //method to set username
  setUserName(username){
    this.user = username;
  }
  //method to get username
  getUserName(){
    return this.user;
  }
  //method to set chat room name
  setChatRoom(roomName){
    this.chatRoom = roomName;
    // console.log(this.getChatRoom());
  }
  //method to get chat room name
  getChatRoom(){
    return this.chatRoom;
  }
  messageText:String;
  messageArray:Array<{user:String,message:String}> = [];
  join(){
    // console.log(this.chatRoom);
    this.chatService.joinRoom({user:this.getUserName(), room:this.getChatRoom()});
  }

  leave(){
    this.chatService.leaveRoom({user:this.getUserName(), room:this.getChatRoom()});
  }

  sendMessage()
  {
    this.chatService.sendMessage({user:this.getUserName(), room:this.getChatRoom(), message:this.getChatMessage()});
    this.message = '';
    // console.log(this.getChatMessage());
  }

}
