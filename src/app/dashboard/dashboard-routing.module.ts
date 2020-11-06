import { ProjectComponent } from './project/project.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { PanelComponent } from './panel/panel.component';

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
    path: 'invitations',
    component: InvitationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

