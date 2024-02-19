import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ParentComponent } from './components/Layout/parent/parent.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ParentAuthComponent } from './components/auth/parent-auth/parent-auth.component';
import { ProfileChoiceComponent } from './components/auth/profile-choice/profile-choice.component';

const routes: Routes = [
  {path: 'login', component: ParentAuthComponent},
  {path: '', 
    component: ParentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect empty path to dashboard
      {path: 'dashboard', component: DashboardComponent},
      {path: 'home', component: HomeComponent},
      {path: '**', component: NotFoundComponent, pathMatch: 'full'},
    ]
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
