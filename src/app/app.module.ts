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

import { RendezVousComponent } from './components/rendez-vous/rendez-vous/rendez-vous.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DemandePackComponent } from './components/subscriptions-packages/demande-pack/demande-pack.component';
import { AddAbonnementsComponent } from './components/subscriptions-packages/add-abonnements/add-abonnements.component';
import { RapportsInformationsComponent } from './components/rapports-informations/rapports-informations.component';
import { DemandeListComponent } from './components/demande-list/demande-list.component';
import { TextAreaComponent } from './components/forms/text-area/text-area.component';
import { DemandeAppointmentComponent } from './components/dashboard/demande-appointment/demande-appointment.component';
import { DemandePartenariatComponent } from './components/auth/demande-partenariat/demande-partenariat.component';
@NgModule({
  declarations: [
    AppComponent,
    HasRoleDirective,
    NotFoundComponent,
    ServerErrorComponent,
    ConfirmDialogComponent,
    RegisterComponent,
    TextInputComponent,
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
    RendezVousComponent,
    DemandePackComponent,
    AddAbonnementsComponent,
    RapportsInformationsComponent,
    DemandeListComponent,
    TextAreaComponent,
    DemandeAppointmentComponent,
    DemandePartenariatComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FullCalendarModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
