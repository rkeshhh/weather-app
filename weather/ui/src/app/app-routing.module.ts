import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './component/log-in/log-in.component';
import { MainComponent } from './component/main/main.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { UpdateProfileComponent } from './component/updateProfile/updateProfile.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path:'main',
    component:MainComponent
  },
  {
    path:'login',
    component:LogInComponent
  },
  {
    path:'registration',
    component:RegistrationComponent
  },
  {
    path:'updateProfile',
    component:UpdateProfileComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }