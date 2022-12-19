import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { IndicatorsService } from 'app/main/pages/indicators/indicators.service';
import { Indicator, Rubro, RubroRequest } from './indicators.model';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndicatorsComponent implements OnInit {

  constructor(private _indicatorsService: IndicatorsService) {
  }

  url = environment.apiUrl;
  private tempData = [];
  private tempDataIndi = [];
  public contentHeader: object;
  public indicator = false;
  public rubro = false;
  public rows: any;
  public rowsIndi: any;
  public kitchenSinkRows: any;
  public kitchenSinkRowsIndi: any;
  public basicSelectedOption = 5;
  public ColumnMode = ColumnMode;
  entry: Rubro;
  indicatorData: Indicator;
  template: any;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  @ViewChild(DatatableComponent) tableIndi: DatatableComponent;
  @ViewChild('tableRowDetailsIndi') tableRowDetailsIndi: any;
  eventsSubject: Subject<void> = new Subject<void>();

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.tempData.filter(function (d) {
      return d.descripcion.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  filterUpdateIndi(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.tempDataIndi.filter(function (d) {
      return d.descripcion.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rowsIndi = temp;
    this.table.offset = 0;
  }

  indicatorEdit(row) {
    this.indicator = true;
    this.rubro = false;
    this.indicatorData = row;
  }

  indicatorAdd() {
    this.indicator = true;
    this.rubro = false;
    this.indicatorData = {
      id_indicador: null,
      nombre: '',
      descripcion: '',
      tipo: '',
      formula: '',
      publico: '',
      id_plantilla: '',
      orden: '',
      expresado: '',
      estado: 'A',
      icono: '',
      detalle_resultado: '',
      formula_mostrar: '',
      nemonico: ''
    };
  }

  backIndicator(event) {
    this.indicator = false;
    this.getIndicator();
  }

  rubroEdit(row?: Rubro) {
    this.entry = row;
    this.indicator = false;
    this.rubro = true;
  }

  rubroAdd() {
    this.entry = {
      descripcion: '',
      estado: 'A',
      id_rubro: null,
      nemonico: '',
      edita_pp: 'I',
      edita_pa: 'I',
      notas: '',
      orden: 0,
  };
    this.indicator = false;
    this.rubro = true;
  }

  backRubro(event) {
    this.rubro = false;
    this.getAll();
  }

  reset() {
    this.getIndicator();
    this.getAll();
    setTimeout(() => {
      this.indicator = false;
      this.rubro = false;
    }, 1000);
  }

  emitEventToChild() {
    this.eventsSubject.next();
  }

  getAll() {
    this._indicatorsService.getAll().subscribe((response: RubroRequest) => {
      this.rows = response.entry;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
    });
  }

  getIndicator() {
    this._indicatorsService.getAllIndicator().subscribe((response: any) => {
      this.rowsIndi = response.indicator;
      this.tempDataIndi = this.rowsIndi;
      this.kitchenSinkRowsIndi = this.rowsIndi;
      this.template = response.template;
    });
  }

  deleteFile(entry): void {
    const R = {
      id: entry.id_rubro
    };
    this._indicatorsService.deleteEntry(R).subscribe(response => {
      this.getAll();
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

  deleteIndicator(indicator) {
    const R = {
      id: indicator.id_indicador
    };
    this._indicatorsService.deleteEntryIndicator(R).subscribe(response => {
      this.getIndicator();
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
    this.getAll();
    this.getIndicator();
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
            name: 'Indicadores',
            isLink: false
          }
        ]
      }
    };
  }
}
