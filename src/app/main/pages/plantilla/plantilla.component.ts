import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { PlantillaService } from './plantilla.service';
import { Template, TemplateRequest } from './template.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlantillaComponent implements OnInit {
  // Private
  template: Template;
  private tempData = [];
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

    const temp = this.tempData.filter(function (d) {
      return d.descripcion.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
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

  constructor(private _plantillaService: PlantillaService) {
    
  }

  usersEdit(row) {
    this.userEdit = true;
    this.rubro = false;
    this.template = row;
  }

  addTemplate() {
    this.template = {
      id_plantilla: null,
      descripcion: '',
      nombre_documento: '', 
      estado: ''
    }
    this.userEdit = true;
    this.rubro = false;
  }

  backUserEdit(event) {
    this.userEdit = false;
    this.getTemplate();
  }

  reset() {
    setTimeout(() => {
      this.userEdit = false;
    }, 1000);
  }

  getTemplate() {
    this._plantillaService.getAll().subscribe((response: TemplateRequest) => {
      this.rows = response.template;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      this.exportCSVData = this.rows;
    });
  }

  deleteFile(template): void {
    const planR = {
      id: template.id_plantilla
    }
    this._plantillaService.deletePlan(planR).subscribe(response => {
      this.getTemplate();
      Swal.fire({
        icon: 'success',
        title: 'Se eliminó registro satisfactoriamente',
        text: 'Su registro ha sido eliminado.',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn btn-success'
        },
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No es posible eliminar este registro, reintente más tarde.',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
      });
    });
  }

  ngOnInit() {
  this.getTemplate();
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
            name: 'Plantilla',
            isLink: false
          }
        ]
      }
    };
  }
}
