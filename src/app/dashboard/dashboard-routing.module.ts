import { ProjectComponent } from './project/project.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InvitationsComponent } from './invitations/invitations.component';
import { PanelComponent } from './panel/panel.component';
import { DetailsComponent } from './project/details/details.component';
import { UserSettingComponent } from './user-setting/user-setting.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: DashboardComponent,
  //   pathMatch: 'full',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: PanelComponent,
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'project',
  //       component: ProjectComponent
  //     },
  //     {
  //       path: 'invitations',
  //       component: InvitationsComponent
  //     }
  //   ]
  // }
  {
    path: '',
    component: PanelComponent,
    pathMatch: 'full'
  },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'project/:id',
    component: DetailsComponent
  },
  {
    path: 'invitations',
    component: InvitationsComponent
  },
  {
    path: 'user-setting',
    component: UserSettingComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

