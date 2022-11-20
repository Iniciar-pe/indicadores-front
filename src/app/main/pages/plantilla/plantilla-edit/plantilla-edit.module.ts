import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { PlantillaEditComponent } from './plantilla-edit.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserViewService } from 'app/main/apps/user/user-view/user-view.service';

@NgModule({
  declarations: [PlantillaEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreCommonModule,
    NgbModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
  ],
  exports: [PlantillaEditComponent],
  providers: [UserViewService]
})
export class PlantillaEditModule {}
