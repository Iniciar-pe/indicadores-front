import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
  @Input() criterion: string;
  @Output() next = new EventEmitter<boolean>();
  
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

    
  }

  getValues(criterion) {
    this._entryOfValuesService.getValues(criterion).subscribe(response => {
      this.rows = response.values.map(res => {
        return {
          id: res.id,
          description: res.description,
          name: res.name,
          currentPeriod: res.currentPeriod ? res.currentPeriod : '0',
          previousPeriod: res.previousPeriod ? res.previousPeriod : '0',
          previousEdit: res.previousEdit,
          currentEdit: res.currentEdit,
          note: res.note,
        }
      });
      this.tempData = this.rows;
    })
  }

  addValues() {

    const data = {
      values: this.rows,
      criterion: this.criterion,
    }

    this._entryOfValuesService.addValues(data).subscribe(data => {
      this.next.emit(true);
    })
  }


}
