import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { DatePeriod } from 'app/main/pages/data-entry/data-entry.model';
import { EntryOfValuesService } from './entry-of-values.service';
import { TabService } from './tab.service';

@Component({
  selector: 'entry-of-values',
  templateUrl: './entry-of-values.component.html',
  styleUrls: ['./entry-of-values.component.scss'],
  providers: [TabService],
  encapsulation: ViewEncapsulation.None
})
export class EntryOfValuesComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  private tempData = [];
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public rows: any;
  public ColumnMode = ColumnMode;
  public selected = 5;
  public money: string;
  public criterion: string;
  @Output() next = new EventEmitter<boolean>();
  @Input('datePeriod') datePeriod: DatePeriod;
  @Input('business') business;
  @Input('currency') currency;
  @Input('nameCurrency') nameCurrency;
  
  constructor(
    private _entryOfValuesService: EntryOfValuesService,
    private currencyPipe: CurrencyPipe
    ) {

  }


  get businessType() {
    return this.business?.type;
  }

  inlineEditingUpdateAge(event, cell, rowIndex, row) {
    this.editingAge[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.addValues(row);
  }

  inlineEditingUpdateSalary(event, cell, rowIndex, row) {
    this.editingSalary[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.addValues(row);
  }


  inlineEditingUpdateStatus(event, cell, rowIndex) {
    this.editingStatus[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.tempData.filter(function (d) {
      return d.description.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  ngOnInit() {
    
    
  }

  getValues(criterion) {
    this.criterion = criterion;
    this._entryOfValuesService.getValues(criterion, this.business.id).subscribe(response => {
      this.rows = response.values.map(e => {
        e.previousPeriod = this.transform(e.previousPeriod);
        e.currentPeriod = this.transform(e.currentPeriod);
        return e;
      });
      this.tempData = this.rows;
    }, err => {
      this.rows = [];
      this.tempData = this.rows;
    });
  }

  addValues(row) {
    const data = {
      value: row.id,
      criterion: this.criterion,
      currentPeriod: row.currentPeriod.replace(',', ''),
      previousPeriod: row.previousPeriod.replace(',', ''),
      business: this.business.id
    };

    this._entryOfValuesService.addValues(data).subscribe(data => {
      // this.next.emit(true);
    });
  }

  transformAmount(element, row, type) {
    const currency = this.currencyPipe.transform(element.target.value.replace(',', ''), '');
    element.target.value = currency.replace('$', '');
    type === 'previousPeriod' ? row.previousPeriod = currency.replace('$', '') : row.currentPeriod = currency.replace('$', '');
  }

  transform(element) {
    // type === 'previousPeriod' ? row.previousPeriod = this.currencyPipe.transform(element.replace(',', ''), '').replace('$', '')
    //  : row.currentPeriod = this.currencyPipe.transform(element.replace(',', ''), '').replace('$', '');
    return this.currencyPipe.transform(element.replace(',', ''), '').replace('$', '');
  }

  validateFormat(event) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
  }

}
