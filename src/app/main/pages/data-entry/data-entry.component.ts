import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Stepper from 'bs-stepper';
import { Observable } from 'rxjs';
import { DataEntry, RequestDataEntry } from './data-entry.model';
import { DataEntryService } from './data-entry.service';

@Component({
  selector: 'app-user',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataEntryComponent implements OnInit {
 
  @ViewChild('modalForm') modalForm;
  public contentHeader: object;
  public businesslist: any[] = [];;
  public year = 2022;
  public business;
  public indicator;
  public loading = false;
  private horizontalWizardStepper: Stepper;
  public dataEntry: DataEntry;
  public data: RequestDataEntry = {
    period: '1',
    month: '01',
    currency: '1',
    year: '2022',
  };
  
  constructor(
    private _dataEntryService: DataEntryService,
    private modalService: NgbModal
    ) {
    
   
  }
 
  ngOnInit() {
    this.getEntryData();
    this.getBusiness();
    this.horizontalWizardStepper = new Stepper(document.querySelector('#stepper1'), {});
    
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

  getEntryData() {
    this._dataEntryService.getEntryData().subscribe((response: DataEntry) => {
      this.dataEntry = response;
      this.data.period = response.criterion?.period;
      this.data.month = response.criterion?.startMonth;
      this.data.year = response.criterion?.startYear;
      this.data.currency = response.criterion?.currency;
      this.business = response?.business
      this.indicator = response?.indicator
    })
  }

  horizontalWizardStepperPrevious() {
    this.horizontalWizardStepper.previous();
  }

  horizontalWizardStepperNext(opcion: number) {
    if(opcion == 1) {
      this.loading = true;
      this.data.business = String(this.business);
      this._dataEntryService.addEntryData(this.data).subscribe(response => {
        this.horizontalWizardStepper.next();
        this.loading = false;
      }, err => {
        this.loading = false;
      })
    }
    
    if(opcion == 2) {
      this.horizontalWizardStepper.next();
    }
    
  }


  countChange(value) {
    this.data.year = value;
  }

  getBusiness() {
    this._dataEntryService.getBusiness().subscribe(response => {
      this.businesslist = response.business.map(res => {
        return {
          chill: res.chill,
          id: res.id,
          name: res.chill != null ? '👉 ' + res.name : res.name,
          ruc: res.ruc,
        };
      })
    })
  }

  modalOpenSLCIM(modalSLCIM) {
    this.modalService.open(modalSLCIM, { scrollable: true });
  }

  endDateMonth(year, month) {
    var date = new Date(year + '-'+ month +'-01');
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth(), 0);
    
    return ultimoDia.getDate();
  }

}
