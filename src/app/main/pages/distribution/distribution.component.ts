import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { DistributionService } from './distribution.service';
import { DistributionModel, Group } from './distribution.model';
import { AuthenticationService } from 'app/auth/service';
import { User } from 'app/auth/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DistributionComponent implements OnInit {

  distribution: DistributionModel;
  public rows: DistributionModel[];
  public tempData: DistributionModel[];
  public contentHeader: object;
  public dsitributionEdit = false;
  public basicSelectedOption = 5;
  public ColumnMode = ColumnMode;
  public currentUser: User;
  public group: Group[];
  public type;

  get isList() {
    return this.rows?.length > 0 || this.group?.length > 0;
  }

  constructor(
    private distributionService: DistributionService,
    private _authenticationService: AuthenticationService,
    private route: ActivatedRoute
    ) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.route.data.subscribe(item => this.type = item.type);
  }

  ngOnInit() {
    this.getList();
    this.getGroup();
    // content header
    this.contentHeader = {
      headerTitle: this.type === '1' ? 'Empresa individual' : 'Empresa con sucursales',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: []
      }
    };
  }

  getList() {
    this.distributionService.get(this.type).subscribe(response => {
      this.rows = response.license as DistributionModel[];
      this.tempData = this.rows;
    });
  }

  distritbutionEdit(row: DistributionModel) {
    this.dsitributionEdit = true;
    this.distribution = row as DistributionModel;
  }

  distritbutionNew() {
    this.dsitributionEdit = true;
    this.distribution = {} as DistributionModel;
    this.distribution.status = 'A';
  }

  goBack() {
    this.getList();
    this.getGroup();
    this.dsitributionEdit = false;
  }

  getGroup() {
    this.distributionService.getGroup(this.type).subscribe(response => {
      this.group = response.group;
    });
  }


}
