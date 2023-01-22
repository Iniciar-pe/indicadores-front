import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginSocialService } from '../login-social.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-auth-login-v1',
  templateUrl: './auth-login-v1.component.html',
  styleUrls: ['./auth-login-v1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV1Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public submitted = false;
  public passwordTextType: boolean;
  public loading = false;
  public error = '';
  public returnUrl: string;
  // Private
  private _unsubscribeAll: Subject<any>;

  linkedInCredentials = {
    clientId: '78eygsqp7carij',
    redirect_uri: environment.front + '/admin/response',
    scope: 'r_liteprofile%r_emailaddress' // To read basic user profile data and email
  };

  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private loginSocialService: LoginSocialService,
  ) {

    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

 login() {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78eygsqp7carij&redirect_uri=${this.linkedInCredentials.redirect_uri}&scope=r_liteprofile%20r_emailaddress&state=DCEeFWf45A53sdfKef424`;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this._router.navigate(['/admin/entrada-de-datos']);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );

  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  loginGoogle() {
    this.loginSocialService.loginGoogle().then(response => {
      this.loginService(response.user.email, response.user.email, response.user.displayName)
    })
  }

  loginFB() {
    this.loginSocialService.loginFaceBook().then(response => {
      console.log(response);
      this.loginService(response.user.email, response.user.email, response.user.displayName)
    });
  }

  loginService(email, password, name) {
    const user = {
      email: email,
      password: password,
      firstName: name,
      password_confirmation: password
    };

    this._authenticationService.registerSocial(user)
      .pipe(first())
      .subscribe(
      data => {
        if( data?.action === '2') {
          this.loginSocialService.userResponse = user;
          this._router.navigate(['/admin/registro']);
        } else {
          this._router.navigate(['/admin/entrada-de-datos']);
        }
        // 
        console.log('data', data);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
