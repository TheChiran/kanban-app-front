import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ButtonComponent } from './button/button.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';

import { UserCardComponent } from './sidenav/user-card/user-card.component';
import { NavlinkComponent } from './sidenav/navlink/navlink.component';
import { PanelComponent } from './panel/panel.component';
import { ProjectComponent } from './project/project.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { TitleComponent } from './title/title.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './project/details/details.component';
import { UserSettingComponent } from './user-setting/user-setting.component';





@NgModule({
  declarations: [
    DashboardComponent, 
    NavbarComponent, 
    SidenavComponent, 
    ButtonComponent, 
    DashboardCardComponent,
    UserCardComponent, 
    NavlinkComponent, 
    PanelComponent, 
    ProjectComponent, 
    InvitationsComponent, 
    TitleComponent,
    DetailsComponent,
    UserSettingComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
