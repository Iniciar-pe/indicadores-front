import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../auth-register-v2/customValidators';

@Component({
  selector: 'app-auth-reset-password-v1',
  templateUrl: './auth-reset-password-v1.component.html',
  styleUrls: ['./auth-reset-password-v1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthResetPasswordV1Component implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public confPasswordTextType: boolean;
  public resetPasswordForm: FormGroup;
  public submitted = false;
  public loading = false;
  private token: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private _router: Router
    ) {

      this.route.queryParams.subscribe(item => {
        this.token = item['token'];
      });
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
    return this.resetPasswordForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * Toggle confirm password
   */
  toggleConfPasswordTextType() {
    this.confPasswordTextType = !this.confPasswordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    const data = {
      password: this.f.password.value,
      token: this.token,
    };

    this._authenticationService.sendPassword(data)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(response => {
      this.loading = false;
      Swal.fire({
        title: '<strong>Se cambio la contraseña correctamente</strong>',
        icon: 'success',
        html:
          'Inicie sesión en el siguiente</b>, ' +
          '<a href="https://frontend-indicadores.devaztweb.com/admin/login">link</a> ',
        confirmButtonText:
          'Aceptar',
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

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.resetPasswordForm = this._formBuilder.group({
      password: [ null, Validators.compose([
        // 1. El campo de contraseña es obligatorio
        Validators.required,
        // 2. comprobar si la contraseña introducida tiene un número
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 3. verifique si la contraseña ingresada tiene letras mayúsculas
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. verifique si la contraseña ingresada tiene un carácter especial
        CustomValidators.patternValidator(/(?=.*[!@#$%^&*()])/, { hasSpecialCharacters: true }),
        // 6. Tiene una longitud mínima de 8 caracteres
        Validators.minLength(8)])
     ],
     confirmPassword: [null, Validators.compose([Validators.required])]
    },
    {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
   });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
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
