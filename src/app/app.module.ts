import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared.module';
import { AppRoutingModule } from './app-routing.module';

//Directives
import { HasRoleDirective } from './directives/has-role.directive';

//Interceptors
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

//Components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { ConfirmDialogComponent } from './components/modals/confirm-dialog/confirm-dialog.component';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileChoiceComponent } from './components/profile-choice/profile-choice.component';
import { SideRightComponent } from './components/side-right/side-right.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';


import { BodyComponent } from './components/Layout/body/body.component';
import { SidenavComponent } from './components/Layout/sidenav/sidenav.component';
import { ParentComponent } from './components/Layout/parent/parent.component';


@NgModule({
  declarations: [
    AppComponent,
    HasRoleDirective,
    NotFoundComponent,
    ServerErrorComponent,
    ConfirmDialogComponent,
    RegisterComponent,
    TextInputComponent,
    HomeComponent,
    LoginComponent,
    ProfileChoiceComponent,
    SideRightComponent,

    BodyComponent,
    SidenavComponent,
    ParentComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
