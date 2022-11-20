import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { PlantillaService } from '../table.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserViewService } from 'app/main/apps/user/user-view/user-view.service';
// ContentHeader component interface
export interface IndicatorEdit {
  headerTitle: string;
  actionButton: boolean;
  breadcrumb?: {
    type?: string;
    links?: Array<{
      name?: string;
      isLink?: boolean;
      link?: string;
    }>;
  };
}

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss']
})
export class TableEditComponent implements OnInit {
  // input variable
  @Input() indicator: IndicatorEdit;
  @Output() back: EventEmitter<any>;
  public data;
  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };
  public basicSelectedOption: number = 5;
  private _unsubscribeAll: Subject<any>;
  private _unsubscribeAll1: Subject<any>;
  private tempData = [];
  public ColumnMode = ColumnMode;
  public kitchenSinkRows: any;
  public rows: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  
  constructor(private _indicatorsService: PlantillaService, private _userViewService: UserViewService) {
    this.back = new EventEmitter<any>();
    this._unsubscribeAll = new Subject();
    this._unsubscribeAll1 = new Subject();
  }


  backUserEdit() {
    this.back.emit(false);
  }

  
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnInit() {
    this._indicatorsService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
    });
    this._userViewService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll1)).subscribe(response => {
      this.data = response;
    });
  
  }
}
