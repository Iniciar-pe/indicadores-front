import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { LoginSocialService } from '../login-social.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'app/auth/service';

@Component({
  selector: 'app-auth-forgot-password-v1',
  templateUrl: './auth-forgot-password-v1.component.html',
  styleUrls: ['./auth-forgot-password-v1.component.scss'],
})
export class AuthForgotPasswordV1Component implements OnInit {
  // Public
  public emailVar;
  public coreConfig: any;
  public forgotPasswordForm: FormGroup;
  public submitted = false;
  public loading = false;

  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   *
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.loading = true;
    const data = {
      email: this.f.email.value,
    };

    this._authenticationService.sendPasswordResetLink(data)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(response => {
      this.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado correctamente',
        text: 'Revise su correo ' + this.f.email.value,
        confirmButtonText: 'Aceptar',
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Se ha producido un error',
        text: 'intente dentro de unos minutos.',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
      });
      this.loading = false;
    });
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(first()).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
