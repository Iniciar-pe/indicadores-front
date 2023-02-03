import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { DistributionService } from './distribution.service';
import { DistributionModel } from './distribution.model';

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
  public basicSelectedOption: number = 5;
  public ColumnMode = ColumnMode;

  constructor(private distributionService: DistributionService) {

  }

  ngOnInit() {
    this.distributionService.get().subscribe(response => {
      this.rows = response.license as DistributionModel[];
      this.tempData = this.rows;
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Empresa individual',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: []
      }
    };
  }

  distritbutionEdit(row) {
    this.dsitributionEdit = true;
    this.distribution = row;
  }


}
