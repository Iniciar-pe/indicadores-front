import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { UserService } from 'app/main/pages/user/user.service';
import { User, UserRequest } from './user.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  rutaAvatar = environment.apiUrl;
  user: User;
  // public
  public contentHeader: object;
  public userEdit = false;
  public rubro = false;
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 5;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;


  inlineEditingUpdateName(event, cell, rowIndex) {
    this.editingName[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }


  inlineEditingUpdateAge(event, cell, rowIndex) {
    this.editingAge[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  inlineEditingUpdateSalary(event, cell, rowIndex) {
    this.editingSalary[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }


  inlineEditingUpdateStatus(event, cell, rowIndex) {
    this.editingStatus[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
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

  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }

  constructor(private _userService: UserService) {
    this._unsubscribeAll = new Subject();
   
  }


  usersEdit(value) {
    this.userEdit = true;
    this.rubro = false;
    this.user = value;
  }

  backUserEdit(event) {
    this.userEdit = false;
  
  }

  reset() {
    setTimeout(() => {
      this.userEdit = false;
    }, 1000);
  }

  getPlan() {
    this._userService.getAll().subscribe((response: UserRequest) => {
      this.rows = response.user;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
    });
  }
 
  ngOnInit() {
    this.getPlan();
    
    // content header
    this.contentHeader = {
      headerTitle: 'Indicadores',
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
            name: 'Configuración',
            isLink: true,
            link: '/'
          },
          {
            name: 'Usuarios',
            isLink: false
          }
        ]
      }
    };
  }
}
