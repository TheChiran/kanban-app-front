import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { NavbarComponent } from './landing-page/navbar/navbar.component';
import { FooterComponent } from './landing-page/footer/footer.component';
import { HeaderComponent } from './landing-page/header/header.component';
import { ProjectFlexibilityComponent } from './landing-page/project-flexibility/project-flexibility.component';
import { TeamWorkComponent } from './landing-page/team-work/team-work.component';
import { ThinkComponent } from './landing-page/think/think.component';
import { ChooseComponent } from './landing-page/choose/choose.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    ProjectFlexibilityComponent,
    TeamWorkComponent,
    ThinkComponent,
    ChooseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
