import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Stepper from 'bs-stepper';
import { Business, DataEntry, RequestDataEntry, DatePeriod } from './data-entry.model';
import { DataEntryService } from './data-entry.service';
import moment from 'moment';
import Swal from 'sweetalert2';
import { EntryOfValuesService } from 'app/main/components/entry-of-values/entry-of-values.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataEntryComponent implements OnInit {

  @ViewChild('childRef') childRef: any;
  @ViewChild('modalForm') modalForm;
  public contentHeader: object;
  public businesslist: any[] = [];
  public year = 2022;
  public business: Business;
  public indicator;
  public loading = false;
  public loadingSecond = false;
  public existCriterion = true;
  private horizontalWizardStepper: Stepper;
  public dataEntry: DataEntry;
  public criterion = '';
  public criterionResponse;
  public loadingRun = false;

  public datePeriod: DatePeriod;

  public data: RequestDataEntry = {
    period: 1,
    month: '01',
    currency: '1',
    year: '2022',
  };


  get businessType() {
    return this.business?.type;
  }

  constructor(
    private _dataEntryService: DataEntryService,
    private modalService: NgbModal,
    private _router: Router,
    private _entryOfValuesService: EntryOfValuesService,
    private _authenticationService: AuthenticationService,
    ) {

  }

  ngOnInit() {
    this.getBusiness();
    this.horizontalWizardStepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Ingreso de datos',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Sigue los pasos',
            isLink: true,
            link: '/'
          }
        ]
      }
    };
  }

  getEntryData(option = true) {

    this._dataEntryService.getEntryData(this.business).subscribe((response: DataEntry) => {
      if (option) {
        this.dataEntry = response;
      }

      if (response.criterion) {
        this.criterionResponse = response.criterion;
        this.criterion = response.criterion?.id;
        this.data.period = response.criterion?.period;
        this.data.month = response.criterion?.startMonth;
        this.data.year = response.criterion?.startYear;
        this.data.currency = response.criterion?.currency;
        this.data.nameCurrency = response.criterion?.nameCurrency;
        this.existCriterion = false;
      }
      
      this.childRef.getValues(response.criterion?.id);
      this.setPeriod();
      this.addDataQyery();
/*
      // this.indicator = response?.indicator;
      // this.getBusiness(response?.business);
*/
    });
  }

  horizontalWizardStepperPrevious() {
    this.horizontalWizardStepper.previous();
  }

  horizontalWizardStepperNext(opcion: number) {
    if (opcion === 1 || opcion === 3) {

      this.addDataQyery(true, opcion);
    }

    if (opcion === 2) {
      this.loadingSecond = false;
      // this.childRef.addValues(this.criterionResponse.id);
      this.horizontalWizardStepper.next();
    }

  }

  addDataQyery(option = false, opcion = 0) {
    //if (this.businessType !== '3') {
      this.loading = option;
      this.data.business = String(this.business.id);
      this.data.startMonth = moment(this.datePeriod.startMonth).format('YYYY-MM-DD');
      this.data.endMonth = moment(this.datePeriod.endMonth).format('YYYY-MM-DD');
      this.data.startMonthPeriod = moment(this.datePeriod.startMonthPeriod).format('YYYY-MM-DD');
      this.data.endMonthPeriod = moment(this.datePeriod.endMonthPeriod).format('YYYY-MM-DD');
      this.data.countDays = this.datePeriod.countDays;
      this.data.type = String(this.business.type);
      this._dataEntryService.addEntryData(this.data).subscribe(response => {
        this.loading = false;
        this.criterion = response.criterion;
        if (option && opcion === 1) {
          this.horizontalWizardStepper.next();
        }
        this.childRef.getValues(response.criterion);
      }, err => {
        this.loading = option;
      });
    /*} else {
      if (option) {
        this.horizontalWizardStepper.next();
      }
      // this.childRef.getValues(this.data);
    }*/
  }

  next() {
    this.loadingSecond = false;
    this.horizontalWizardStepper.next();
  }


  countChange(value) {
    this.data.year = value;
    this.setPeriod();
    this.addDataQyery();
  }

  getBusiness() {
    this._dataEntryService.getBusiness().subscribe(response => {

      this.businesslist = response.business.map(res => {
        return {
          chill: res.chill,
          id: res.id,
          name: res.type === '3' ? '- ' + res.name : res.name,
          ruc: res.ruc,
          type: res.type,
          user: res.user,
          date: res.date,
          dateEnd: res.dateEnd,
          isActive: response?.default.filter(e => e.business === res.id).length > 0,
        };
      });
      this.business = this.businesslist?.filter(e => e.id === response?.default?.filter(i => i.default === 'S')[0]?.business)[0];
      this.getEntryData();
    });
  }

  modalOpenSLCIM(modalSLCIM) {
    this.modalService.open(modalSLCIM,  {
      scrollable: true,
      size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }

  endDateMonth(date) {
    // let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    const ultimoDia = new Date(date.getFullYear(), date.getMonth(), 0);
    return ultimoDia.getDate();
  }

  setBusiness(event) {
    this.business = event;
    console.log(this.business);
    this.getEntryData(false);
  }

  setPeriod() {
    let period = this.dataEntry?.period.filter(e => e.id === Number(this.data.period))[0]?.count;
    if (!period) {
      period = [
        {
          id: 1,
          count: 1
        },
        {
          id: 2,
          count: 3
        },
        {
          id: 3,
          count: 6
        },
        {
          id: 4,
          count: 12
        }
      ].filter(e => e.id === Number(this.data.period))[0]?.count;
    }
    const startMonth = new Date(Number(this.data.year), Number(this.data.month) - 1, 1);
    const endMonth = new Date(Number(
        moment(startMonth).add(period, 'month').format('YYYY')),
        Number(moment(startMonth).add(period, 'month').format('MM')) - 1,
        0);
    const startMonthPeriod = new Date(
      Number(moment(startMonth).subtract(period, 'month').format('YYYY')),
      Number(moment(startMonth).subtract(period, 'month').format('MM')) - 1,
      1);
    const endMonthPeriod = new Date(
      Number(moment(startMonth).subtract(1, 'month').format('YYYY')),
      Number(moment(startMonth).subtract(1, 'month').format('MM')),
      0);

    this.datePeriod = {
      startMonth: startMonth,
      endMonth: endMonth,
      startMonthPeriod: startMonthPeriod,
      endMonthPeriod: endMonthPeriod,
      period: String(this.data.period),
      countDays: String((endMonth.getTime() - startMonth.getTime()) / (1000 *  60 * 60 * 24)),
    };

  }

  changePeriod() {
    this.setPeriod();
    this.addDataQyery();
  }

  runProcess() {

    const date = Date.now();
    const dateEnd = Date.parse(this.business.dateEnd);
    
    if (date >= dateEnd) {

      if (this._authenticationService.isAnalyst) {
        Swal.fire({
          icon: 'error',
          title: 'Su licencia para '+ this.business.name +' ha vencido, favor gestionar la renovación.',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-danger'
          },
        });
      }

      if (this._authenticationService.isOwner) {

        Swal.fire({
          title: 'Su licencia para '+ this.business.name +' ha vencido, favor gestionar la renovación.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-danger'
          },
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this._router.navigate(['/apps/comercio/lista']);
          } 
        })

        
        /*Swal.fire({
          icon: 'error',
          title: 'Su licencia para '+ this.business.name +' ha vencido, favor gestionar la renovación.',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-danger'
          },
        });*/
      }
      
      return false;
    }

    if (this.validateValues()) {
      this.loadingRun = true;
      const data = {
        criterion: this.criterion,
        business: this.business.id
      };
      this._dataEntryService.runProcess(data).subscribe(response => {
        this.loadingRun = false;
        this._router.navigate(['/admin/ratios']);
      }, err => {
        this.loadingRun = false;
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ingreso de valores no completado',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
      });
    }
  }

  validateValues() {
    const data =  this.childRef.rows.filter(item => {
      if (item.previousEdit !== 'I' && item.currentEdit !== 'I') {
        if (Number(item.previousPeriod.replace(/,/g, '')) > 0 && Number(item.currentPeriod.replace(/,/g, '')) > 0) {
          return item;
        }
      } else if (item.previousEdit !== 'I' && item.currentEdit === 'I') {
        if (Number(item.previousPeriod.replace(/,/g, '')) > 0) {
          return item;
        }
      } else if (item.previousEdit === 'I' && item.currentEdit !== 'I') {
        if (Number(item.currentPeriod.replace(/,/g, '')) > 0) {
          return item;
        }
      }
    });
    return data.length === this.childRef.rows.length;
  }

}
