import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { ModalLiistIndicatorsComponent } from './modal-list-indicators.component';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [ModalLiistIndicatorsComponent],
  imports: [NgbModule, CoreCommonModule, DragulaModule.forRoot()],
  exports: [ModalLiistIndicatorsComponent]
})
export class ModalListIndicatorsModule {}
