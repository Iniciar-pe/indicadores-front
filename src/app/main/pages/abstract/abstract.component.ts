import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Business, DatePeriod } from '../data-entry/data-entry.model';
import { DataEntryService } from '../data-entry/data-entry.service';
import { RatioService } from '../ratio/ratio.service';

@Component({
  selector: 'app-user',
  templateUrl: './abstract.component.html',
  styleUrls: ['./abstract.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AbstractComponent implements OnInit {

  public contentHeader: object;
  public businesslist: any[] = [];
  public business: Business;
  public datePeriod: DatePeriod;

  constructor(
    private _dataEntryService: DataEntryService,
    private _ratiosService: RatioService,
    ) {

  }

  ngOnInit() {
    this.getBusiness();
    // content header
    this.contentHeader = {
      headerTitle: 'Resumen ejecutivo',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: '',
            isLink: true,
            link: '/'
          }
        ]
      }
    };
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
          isActive: response?.default.filter(e => e.business === res.id).length > 0,
        };
      });
      this.business = this.businesslist.filter(e => e.id === response?.default.filter(i => i.default === 'S')[0].business)[0];
      this.getRatios();
    });
  }

  setBusiness(event) {
    this.business = event;
  }

  getRatios() {
    const data = {
      business: this.business.id,
    };
    this._ratiosService.getRatios(data).subscribe(response => {
      this.datePeriod = {
        startMonth: new Date(Number(response.default.startYear), Number(response.default.startMonth) - 1, 1),
        endMonth: new Date(Number(response.default.endYear), Number(response.default.endMonth), 0),
        startMonthPeriod: new Date(Number(response.default.startYearPrevious),Number(response.default.startMonthPrevious) - 1, 1),
        endMonthPeriod: new Date(Number(response.default.endYearPrevious),Number(response.default.endMonthPrevious), 0),
        period: response.default.period,
        countDays: response.default.countDays,
      };

    });
  }

}
