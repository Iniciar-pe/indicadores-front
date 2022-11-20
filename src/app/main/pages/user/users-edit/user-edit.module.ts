import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { UserEditComponent } from './user-edit.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserViewService } from 'app/main/apps/user/user-view/user-view.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreCommonModule,
    NgbModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    SweetAlert2Module.forRoot()
  ],
  exports: [UserEditComponent],
  providers: [UserViewService]
})
export class UserEditModule {}
