import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { UserService } from '../user.service';
import { HistoryUser, User, UserAssigned } from '../user.model';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  // input variable
  @Input() user: User;
  rutaAvatar = environment.apiUrl;
  @Output() back: EventEmitter<any>;
  public data;
  userBusiness: string;
  userCount: string;
  sinAsignate = 0;
  statusUser: boolean;
  history: HistoryUser;
  titleMessage: string =  '¿Está seguro de activar el usuario?';

  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };
  public basicSelectedOption: number = 5;
  private tempData = [];
  public ColumnMode = ColumnMode;
  public rows: any;
  public listUser = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  
  constructor(private _userService: UserService) {
    this.back = new EventEmitter<any>();
  }


  backUserEdit() {
    this.back.emit(false);
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  getUserList(type: number) {
    const user = {
      id: this.user.id,
      type: type 
    }

    this.rows = [];

    this._userService.getUserAll(user).subscribe(item => {
      this.rows = item.user.filter(e => {
        if (type == 1) {
          if (e.type == type) {
            return e;
          }
        } else if (type == 3) {
          return e;
        } else {
          if (e.type != 1) {
            return e;
          }
        }
        
      }) as UserAssigned;
      this.tempData = this.rows;
      this.userBusiness = item.userBusiness;
      this.userCount = item.userCount;
      this.sinAsignate = Number(this.user.countLicense) - Number(this.userCount);
      this.history = item.history.map(e => {
        e.order = e.order == '1' ? true : false;
        return e;
      })  as HistoryUser;
    })
  }

  userActivate() {
    const user = {
      id: this.user.id,
      status: !this.statusUser ? 'A' : 'I'
    }
    this._userService.activateUser(user).subscribe(value => {
      setTimeout(() => {
        this.user.status = user.status;
        this.statusUser = user.status == 'A';
        this.titleMessage = this.user.status == 'I' 
          ? '¿Está seguro de activar el usuario?'
          : '¿Está seguro de desactivar el usuario?';
        Swal.fire({
          icon: 'success',
          title: value.message,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-success'
          },
        });
      }, 900);
      
    }, err => this.messageError())
  }

  messageError(){
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

  ngOnInit() {
    this.statusUser = this.user.status == 'A';
    this.titleMessage = this.user.status == 'I' 
      ? '¿Está seguro de activar el usuario?'
      : '¿Está seguro de desactivar el usuario?';
    this.getUserList(1);
  }

  updateUser(item) {
    item.order = item.order ? '0' : '1';
    this._userService.updateHistory(item).subscribe(value => {
      
        Swal.fire({
          icon: 'success',
          title: value.message,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-success'
          },
        });
        console.log(item.order);
        item.order = item.order == '1';
      
    }, err => this.messageError())
    
  }

  updateUserDonate(item) {
    item.order = item.order ? '0' : '1';
    this._userService.updateDonate(item).subscribe(value => {
      
        Swal.fire({
          icon: 'success',
          title: value.message,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-success'
          },
        });
        console.log(item.order);
        item.order = item.order == '1';
      
    }, err => this.messageError())
  }
  

}
