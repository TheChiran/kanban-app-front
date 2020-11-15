import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './authentication/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module')
      .then(m=>m.AuthenticationModule)
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    children:[{
      path: '',
      loadChildren: ()=>import ('./dashboard/dashboard.module')
      .then(m=>m.DashboardModule)
    }],
    canActivate: [AuthGuardService]
  },
  {
    path: 'logout',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
