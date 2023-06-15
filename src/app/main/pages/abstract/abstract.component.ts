import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Business, DatePeriod } from '../data-entry/data-entry.model';
import { DataEntryService } from '../data-entry/data-entry.service';
import { RatioService } from '../ratio/ratio.service';
import { AuthenticationService } from 'app/auth/service/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AbstractService } from './abstract.service';
import { HttpResponse } from '@angular/common/http';

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
  public loading

  constructor(
    private _dataEntryService: DataEntryService,
    private _abstractService: AbstractService,
    private _ratiosService: RatioService,
    private _authenticationService: AuthenticationService,
    private _router: Router,
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
          date: res.date,
          dateEnd: res.dateEnd,
          status: res.status,
          numberOrder: res.numberOrder,
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


  runProcess() {

    this.loading = true;
    const date = Date.now();
    const dateEnd = Date.parse(this.business.dateEnd);

    /*if (this.business.status == 'I') {
      Swal.fire({
        icon: 'error',
        title: 'Su licencia para el pedido de compra '+this.business.numberOrder+' se encuentra en estado “Pendiente de pago”, favor gestionar la activación',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
      });
    }*/
    
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

      }
      
      return false;
    }

    this._abstractService.runProcess(this.business.id)
      .subscribe((response: HttpResponse<Blob>) => {
        let filename: string = this.getFileName(response)
        let binaryData = [];
        binaryData.push(response.body);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
        downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.loading = false;
    }, err => {
      this.loading = false;
    });

  }

  getFileName(response: HttpResponse<Blob>) {
    let filename: string;
    try {
      const contentDisposition: string = response.headers.get('content-disposition');
      const r = /(?:filename=")(.+)(?:;")/
      filename = r.exec(contentDisposition)[1];
    }
    catch (e) {
      filename = 'resumen-ejecutivo-analisis.pdf'
    }
    return filename
  }

}
