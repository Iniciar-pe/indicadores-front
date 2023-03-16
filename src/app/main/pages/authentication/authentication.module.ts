import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { AuthForgotPasswordV1Component } from 'app/main/pages/authentication/auth-forgot-password-v1/auth-forgot-password-v1.component';
import { AuthLoginV1Component } from 'app/main/pages/authentication/auth-login-v1/auth-login-v1.component';
import { AuthRegisterV2Component } from 'app/main/pages/authentication/auth-register-v2/auth-register-v2.component';
import { AuthResetPasswordV1Component } from 'app/main/pages/authentication/auth-reset-password-v1/auth-reset-password-v1.component';
import { ResponseComponent } from './response.component';

// routing
const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginV1Component,
  
  },
  {
    path: 'registro',
    component: AuthRegisterV2Component,
   
  },
  {
    path: 'nuevo-password',
    component: AuthResetPasswordV1Component,
   
  },
  {
    path: 'recuperar',
    component: AuthForgotPasswordV1Component,
   
  },
  {
    path: 'response',
    component: ResponseComponent,

  }
];

@NgModule({
  declarations: [
    AuthLoginV1Component,
    AuthRegisterV2Component,
    AuthForgotPasswordV1Component,
    AuthResetPasswordV1Component,
    ResponseComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule]
})
export class AuthenticationModule {}
