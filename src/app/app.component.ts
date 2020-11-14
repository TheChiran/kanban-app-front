import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KanbanApp';

  constructor(){
    this.setToken();
  }
  setToken(){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE5ODA0MzNiMTMxZjJlODAwZmE3MzgiLCJpYXQiOjE2MDQ5Nzc4NDZ9.LMbYQG78kBbpnz3ISfI6SI-niGkjBaoBGe0doOT90DU';
    localStorage.setItem('token',`${token}`);
  }
}
