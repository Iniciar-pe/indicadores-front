import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AccountSettingsService } from 'app/main/pages/account-settings/account-settings.service';
import { PasswordResponse, UserRespose } from 'app/main/models/user.model';
import { environment } from 'environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CustomValidators } from '../authentication/auth-register-v2/customValidators';
import { AuthenticationService } from 'app/auth/service/authentication.service';
import { User } from 'app/auth/models';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  // public

  public contentHeader: object;
  form: FormGroup;
  formPassword: FormGroup;
  public submitted = false;
  public submittedPassword = false;
  loading = false;
  loadingPassword = false;
  public currentUser: User;

  get f() {
    return this.form.controls;
  }

  get fP() {
    return this.formPassword.controls;
  }

  userResponse: UserRespose = {
    id_usuario: null,
    usuario: '',
    email: '',
    nombres: '',
    apellidos: '',
    movil: '',
    sexo: '',
    direccion: '',
    ubi_codigo: '',
    fecha_nacimiento: '',
    fecha_registro: '',
    foto: '',
    tipo: '',
    estado: '',
  };

  passwordResponse: PasswordResponse = {
    passwordPrevious: '',
    password: '',
    confirmPassword: ''
  };

  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;
  public avatarImage: string;
  public orders = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _accountSettingsService: AccountSettingsService,
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    ) {
    this._unsubscribeAll = new Subject();
  }

  togglePasswordTextTypeOld() {
    this.passwordTextTypeOld = !this.passwordTextTypeOld;
  }

  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }

  togglePasswordTextTypeRetype() {
    this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.avatarImage = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);

      const file = (event.target as HTMLInputElement)?.files?.[0];

      const data: any = new FormData();
      data.append('file', file);

      this._accountSettingsService.uploadImage(data).subscribe(e => {
        this.loading = false;
        this.avatarImage = environment.apiUrl + e.avatar;
      }, err => this.messageError());
    }
  }

  messageError() {
    this.loading = false;
    Swal.fire({
      icon: 'error',
      title: 'Se ha producido un error',
      text: 'intente dentro de unos minutos.',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'btn btn-danger'
      },
    });
  }

  getUSer() {
    this._accountSettingsService.getUser().subscribe((value: UserRespose) => {
      this.userResponse = value;
      this.avatarImage = environment.apiUrl + value.foto;
      this.f.user.setValue(this.userResponse.usuario);
      this.f.email.setValue(this.userResponse.email);
      this.f.nombres.setValue(this.userResponse.nombres);
      this.f.apellidos.setValue(this.userResponse.apellidos);
      this.f.movil.setValue(this.userResponse.movil);
      this.f.fecha_nacimiento.setValue(this.userResponse.fecha_nacimiento);
      this.f.direccion.setValue(this.userResponse.direccion);
      this.f.sexo.setValue(this.userResponse.sexo);
      this.f.pais.setValue(this.userResponse.pais);
      this.f.ciudad.setValue(this.userResponse.ciudad);
      this.f.ubi_codigo.setValue(this.userResponse.ubi_codigo);

      const userCurrent = {
        id: this.userResponse.id_usuario,
        email: this.userResponse.email,
        firstName: this.userResponse.nombres,
        lastName: this.userResponse.apellidos,
        avatar: value.foto,
        number: this.userResponse.movil,
        address: this.userResponse.direccion,
        country: this.userResponse.pais,
        city: this.userResponse.ciudad,
        code: this.userResponse.ubi_codigo,
      } as User;

      this._authenticationService.updateUser(userCurrent);
    });
  }

  submit() {

    
    this.loading = true;
    const usuario = {
      id_usuario: this.userResponse.id_usuario,
      user: this.f.user.value,
      email: this.f.email.value,
      firstName: this.f.nombres.value,
      lastName: this.f.apellidos.value,
      phone: this.f.movil.value,
      direccion: this.f.direccion.value,
      fecha_nacimiento: this.f.fecha_nacimiento.value,
      sexo: this.f.sexo.value,
      pais: this.f.pais.value,
      ciudad: this.f.ciudad.value,
      ubi_codigo: this.f.ubi_codigo.value
    };

    this._accountSettingsService.editUser(usuario).subscribe(value => {
      this.getUSer();
      this.loading = false;
      this.messageSuccess();
    });
  }

  ngOnInit() {
    this.getUSer();
    this.getOders();
    this.form = this._formBuilder.group({
      id_usuario: [this.userResponse.id_usuario, [Validators.required]],
      user: [this.userResponse.usuario, [Validators.required]],
      email: [this.userResponse.email, [Validators.required]],
      nombres: [this.userResponse.nombres, [Validators.required]],
      apellidos: [this.userResponse.apellidos, [Validators.required]],
      movil: [this.userResponse.movil],
      direccion: [this.userResponse.direccion],
      sexo: [this.userResponse.sexo],
      fecha_nacimiento: [this.userResponse.fecha_nacimiento],
      fecha_registro: [this.userResponse.fecha_registro],
      tipo: [this.userResponse.tipo],
      estado: [this.userResponse.estado],
      pais: [this.userResponse.pais],
      ciudad: [this.userResponse.ciudad],
      ubi_codigo: [this.userResponse.ubi_codigo]
    });

    this.formPassword = this._formBuilder.group({
      passwordPrevious: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, Validators.compose([Validators.required])]
    },
    {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
   });

    this.contentHeader = {
      headerTitle: 'Mi Cuenta',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Inicio',
            isLink: true,
            link: '/'
          },
          {
            name: 'Perfil',
            isLink: true,
            link: '/'
          },
          {
            name: 'Mi Cuenta',
            isLink: false
          }
        ]
      }
    };
  }

  messageSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'El registro se actualizo correctamente',
      // text: 'intente dentro de unos minutos.',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'btn btn-success'
      },
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  submitPassword() {
    this.loadingPassword = true;
    const usuario = {
      email: this.f.email.value,
      password: this.fP.passwordPrevious.value,
      confirmPassword: this.fP.password.value,
    };

    this._accountSettingsService.editPassword(usuario).subscribe(value => {

      this.loadingPassword = false;
      this.messageSuccess();
    }, err => {
      this.loadingPassword = false;
    });
  }

  getOders() {
     this._accountSettingsService.getOders().subscribe(item => {
      this.orders = item.orders;
    })
  }

}
