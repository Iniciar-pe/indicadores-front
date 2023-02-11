import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil, first, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from './customValidators';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginSocialService } from '../login-social.service';
import moment from 'moment';

@Component({
  selector: 'app-auth-register-v2',
  templateUrl: './auth-register-v2.component.html',
  styleUrls: ['./auth-register-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthRegisterV2Component implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public confirmPasswordTextType: boolean;
  public registerForm: FormGroup;
  public submitted = false;
  public error = '';
  public returnUrl: string;
  public loading = false;
  public token = '';
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
    private _router: Router,
    private _route: ActivatedRoute,
    private loginSocialService: LoginSocialService
  ) {
    const urlTree = this._router.parseUrl(this._router.url);

    this.token = urlTree.queryParams['url'];
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
    return this.registerForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  toggleConfirmPasswordTextType() {
    this.confirmPasswordTextType = !this.confirmPasswordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    
    this.submitted = true;
 
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    const now = moment();
    const user = {
      email: this.f.email.value,
      password: this.f.password.value,
      firstName: this.f.name.value,
      lastName: this.f.lastName.value,
      phone: this.f.phone.value,
      ruc: this.f.ruc.value,
      business: this.f.business.value,
      password_confirmation: this.f.password.value,
      policy: this.f.policy.value,
      data: this.f.data.value,
      businessExist: this.f.businessExist.value ? 'S' : 'N',
      token: this.token,
      date: now.format('YYYY-MM-DD'),
    };

    this._authenticationService.register(user).pipe(first()).subscribe(
      data => {
        console.log(data);
        this.login();
      },
      error => {
        console.log(error);
        this.error = error;
        this.loading = false;
      }
    );
  }

  login() {
    this._authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this._router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  addValidators() {
    if(this.f.businessExist.value){
      this.f.ruc.validator = <any>Validators.compose([Validators.required, Validators.min(20000000000), Validators.max(29999999999)]);
      this.f.business.validator = <any>Validators.compose([Validators.required, Validators.maxLength(80)]);               
    } else {                
      this.f.ruc.clearValidators();  
      this.f.business.clearValidators();               
    }
    this.f.ruc.updateValueAndValidity(); 
    this.f.business.updateValueAndValidity(); 
  }

  createSignupForm(): FormGroup {
    return this._formBuilder.group(
      {
        name: ['', [Validators.required, Validators.maxLength(80)]],
        lastName: ['', [Validators.required, Validators.maxLength(80)]],
        phone: ['', [Validators.required, Validators.min(900000000), Validators.max(999999999)]],
        ruc: [''],
        business: [''],
        policy: [''],
        data: [''],
        businessExist: [''],
        email: [null, Validators.compose([
           Validators.email,
           Validators.required,
           Validators.maxLength(100)
          ])
        ],
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
     
  }
  
  ngOnInit(): void {
    this.registerForm = this.createSignupForm();

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });

    this.registerForm.get('businessExist').valueChanges.subscribe(selectedValue => {
      this.addValidators();
    });

    this.f.email.setValue(this.loginSocialService.userResponse?.email);
    this.f.name.setValue(this.loginSocialService.userResponse?.firstName);
    // this.loginSocialService.userResponse;
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
