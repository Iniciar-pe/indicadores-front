import { NgModule } from '@angular/core';
import { CoreCommonModule } from '@core/common.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { EntryOfValuesComponent } from 'app/main/components/entry-of-values/entry-of-values.component';
import { DatatablesService } from 'app/main/tables/datatables/datatables.service';


@NgModule({
  declarations: [EntryOfValuesComponent],
  imports: [
    NgbModule,
    CoreCommonModule,
    NgxDatatableModule,
    
  ],
  exports: [EntryOfValuesComponent],
  providers: [DatatablesService]
})
export class EntryOfValuesModule {}
