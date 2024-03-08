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
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';


import { BodyComponent } from './components/Layout/body/body.component';
import { SidenavComponent } from './components/Layout/sidenav/sidenav.component';
import { ParentComponent } from './components/Layout/parent/parent.component';
import { HeaderComponent } from './components/Layout/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { DashboardHeaderComponent } from './components/dashboard/dashboard-header/dashboard-header.component';
import { AuthLeftCarouselComponent } from './components/auth/auth-left-carousel/auth-left-carousel.component';
import { ParentAuthComponent } from './components/auth/parent-auth/parent-auth.component';
import { ProfileChoiceComponent } from './components/auth/profile-choice/profile-choice.component';
import { AccountSettingsComponent } from './components/dashboard/account-settings/account-settings.component';
import { SendEmailComponent } from './components/auth/send-email/send-email.component';
import { ConfirmEmailComponent } from './components/auth/confirm-email/confirm-email.component';
import { SubscriptionsPackagesComponent } from './components/subscriptions-packages/subscriptions-packages.component';
import { NewTerrainComponent } from './components/dashboard/new-terrain/new-terrain.component';
import { FormPackComponent } from './components/dashboard/form-pack/form-pack.component';
import { TypeNewPasswordComponent } from './components/auth/type-new-password/type-new-password.component';
import { CommentPubComponent } from './components/dashboard/comment-pub/comment-pub.component';


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

    BodyComponent,
    SidenavComponent,
    ParentComponent,
    HeaderComponent,
    DashboardComponent,
    ResetPasswordComponent,
    DashboardHeaderComponent,
    AuthLeftCarouselComponent,
    ParentAuthComponent,
    AccountSettingsComponent,
    SendEmailComponent,
    ConfirmEmailComponent,
    SubscriptionsPackagesComponent,
    NewTerrainComponent,
    FormPackComponent,
    TypeNewPasswordComponent,
    CommentPubComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
