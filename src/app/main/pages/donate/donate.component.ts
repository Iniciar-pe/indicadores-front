import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { DonateService } from './donate.service';
import { Donate } from './donate.model';
import { AuthenticationService } from 'app/auth/service';
import { User } from 'app/auth/models';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { EmailService } from 'app/main/apps/email/email.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-user',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DonateComponent implements OnInit {

  public rows: Donate[];
  public contentHeader: object;
  public basicSelectedOption: number = 5;
  public ColumnMode = ColumnMode;
  public ruta;
  public openComposeRef;

  constructor(
    private donateService: DonateService,
    private _emailService: EmailService,
    private _coreSidebarService: CoreSidebarService
    ) {
  }

  ngOnInit() {
    this.ruta = environment.front + '/#/admin/registro?url=';
    this.getList();
    // content header
    this.contentHeader = {
      headerTitle: 'Distribución de licencias para donar',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: []
      }
    };
  }

  getList() {
    this.donateService.get().subscribe(response => {
      this.rows = response.donate as Donate[];
    });
  }

  copyText(val: string){
    const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

    }

    openCompose() {
      this.openComposeRef = true;
      this._emailService.composeEmail(this.openComposeRef);
      this._coreSidebarService.getSidebarRegistry('email-sidebar')?.toggleOpen();
    }

}
