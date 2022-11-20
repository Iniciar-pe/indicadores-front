import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { ModalLicenseComponent } from './modal-license.component';


@NgModule({
  declarations: [ModalLicenseComponent],
  imports: [RouterModule, NgbModule, CoreCommonModule],
  exports: [ModalLicenseComponent]
})
export class ModalLicenseModule {}
