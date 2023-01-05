import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service';
import { first } from 'rxjs/operators';
import { LoginSocialService } from './login-social.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-response',
  template: `<div class="loading-logo">
  <img src="assets/images/logo/logo.png" alt="Logo" />
</div>
<br>
<br>
<div class="loading">
  <div class="effect-1 effects"></div>
  <div class="effect-2 effects"></div>
  <div class="effect-3 effects"></div>
</div>`,
  encapsulation: ViewEncapsulation.None
})
export class ResponseComponent implements OnInit {

  client_id = '78eygsqp7carij';
  client_secret = 'zoT6SZTxFHhqLguP';
  redirect_uri = environment.front + '/admin/response';
  code = '';
  state = '';
  public returnUrl: string;

  constructor(
    private _coreConfigService: CoreConfigService,
    private activatedRoute: ActivatedRoute,
    private loginSocial: LoginSocialService,
    private _authenticationService: AuthenticationService,
    private _router: Router,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code'] || null;
      this.state = params['state'] || null;
      console.log(this.code);
    });

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

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    const param = {
      code: this.code
    };

    this.loginSocial.tokenLin(param).subscribe(response => {
      const data = response.email.elements[0];
      // .['handle~'].emailAddress;

      const obj1 = JSON.stringify(data).replace('~', 'Email');
      const email = JSON.parse(obj1).handleEmail.emailAddress;
      console.log(email);
      this.loginService(email, '', '');
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
          this.loginSocial.userResponse = user;
          this._router.navigate(['/admin/registro']);
        } else {
          this._router.navigate([this.returnUrl]);
        }
        
      },
      error => {
        console.log(error);
      }
    );
  }

}
