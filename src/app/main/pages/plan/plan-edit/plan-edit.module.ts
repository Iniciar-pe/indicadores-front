import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { PlanEditComponent } from './plan-edit.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserViewService } from 'app/main/apps/user/user-view/user-view.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [PlanEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreCommonModule,
    NgbModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    ToastrModule,
  ],
  exports: [PlanEditComponent],
  providers: [UserViewService]
})
export class PlanEditModule {}
