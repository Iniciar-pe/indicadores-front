import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { DistributionEditComponent } from './distribution-edit.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [DistributionEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreCommonModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ],
  exports: [DistributionEditComponent],
})
export class DistributionEditModule {}
