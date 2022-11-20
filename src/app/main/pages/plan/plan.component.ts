import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { PlanService } from './plan.service';
import { Plan, PlanRequest } from './plan.model';
import { BeforeOpenEvent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlanComponent implements OnInit {
  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  // public
  public contentHeader: object;
  public userEdit = false;
  public rubro = false;
  public rows: any;
  public selected = [];
  
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
  planData: Plan;
  validateType = false;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private _planService: PlanService) {
    this._unsubscribeAll = new Subject();
   
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      return d.descripcion.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  planEdit(row: Plan) {
    this.userEdit = true;
    this.rubro = false;
    this.planData = row;
  }

  indicatorAdd(){
    
    this.userEdit = true;
    this.rubro = false;
    this.planData = {
      id_plan: null,
      descripcion: '',
      numero: null,
      precio: '',
      tipo: 'N',
      estado: 'A',
    };
  }

  existType() {
    this.validateType = this.rows.filter(e => e.tipo == 'S').length > 0;
  }

  backUserEdit(event) {
    this.userEdit = false;
    this.getPlan();
  }

  reset() {
    setTimeout(() => {
      this.userEdit = false;
    }, 1000);
  }

  submitPlan(plan: any) {
    console.log('entro', plan.description);
  }

  getPlan() {
    this._planService.getAll().subscribe((response: PlanRequest) => {
      this.rows = response.plan;
      this.tempData = this.rows;
      
    });
  }

  deleteFile(plan): void {
    const planR = {
      id: plan.id_plan
    }
    this._planService.deletePlan(planR).subscribe(response => {
      this.getPlan();
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
            name: 'Registro de Planes',
            isLink: false
          }
        ]
      }
    };
  }
}
