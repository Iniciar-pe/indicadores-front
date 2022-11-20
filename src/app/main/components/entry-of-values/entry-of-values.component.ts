import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { EntryOfValuesService } from './entry-of-values.service';

@Component({
  selector: 'entry-of-values',
  templateUrl: './entry-of-values.component.html',
  styleUrls: ['./entry-of-values.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntryOfValuesComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  private tempData = [];
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public rows: any;
  public ColumnMode = ColumnMode;
  public selected: number = 5;
  
  constructor(private _entryOfValuesService: EntryOfValuesService) {
   
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

    const temp = this.tempData.filter(function (d) {
      return d.descripcion.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  ngOnInit() {
    this._entryOfValuesService.getValues().subscribe(response => {
      this.rows = response.values;
      this.tempData = this.rows;
    })
    
  }


}
