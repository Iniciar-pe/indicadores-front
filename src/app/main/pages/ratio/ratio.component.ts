import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ratios } from './ratio.model';
import { RatioService } from './ratio.service';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { DataEntryService } from '../data-entry/data-entry.service';
import { Business, DatePeriod } from '../data-entry/data-entry.model';

@Component({
  selector: 'app-user',
  templateUrl: './ratio.component.html',
  styleUrls: ['./ratio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RatioComponent implements OnInit {

  @ViewChild('childRef') childRef: any;
  @ViewChild('modalForm') modalForm;
  public contentHeader: object;
  public businesslist: any[] = [];
  public business: Business;
  public datePeriod: DatePeriod;
  private tempData = [];
  public rows: Ratios[];
  public basicSelectedOption = 5;
  public ColumnMode = ColumnMode;
  public symbol: string;
  public ratioDetail;

  constructor(
    private _ratiosService: RatioService,
    private modalService: NgbModal,
    private _dataEntryService: DataEntryService,
    ) { }

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  ngOnInit() {
    this.getBusiness();

    // content header
    this.contentHeader = {
      headerTitle: 'Ratios Financieros',
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
    this.getRatios();
  }

  modalOpenSLCIM(modalSLCIM) {
    this.modalService.open(modalSLCIM, { scrollable: true });
  }

  getRatios() {
    const data = {
      business: this.business.id,
      type: 2,
    };
    this._ratiosService.getRatios(data).subscribe(response => {
      this.rows = response.ratios.map(e => {
        if (e.voiced === '2') {
          e.result = String(Number(e.result) * 100);
        }
        return e;
      });
      this.tempData = this.rows;
      this.symbol = response.default.symbol;
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

  detail(item, modal) {
    this.ratioDetail = item;
    this.modalService.open(modal, {
      centered: true,
      size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }

}
