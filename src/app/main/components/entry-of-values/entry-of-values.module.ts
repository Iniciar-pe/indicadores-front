import { NgModule } from '@angular/core';
import { CoreCommonModule } from '@core/common.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { EntryOfValuesComponent } from 'app/main/components/entry-of-values/entry-of-values.component';


@NgModule({
  declarations: [EntryOfValuesComponent],
  imports: [
    NgbModule,
    CoreCommonModule,
    NgxDatatableModule,
  ],
  exports: [EntryOfValuesComponent],
  providers: []
})
export class EntryOfValuesModule {}
