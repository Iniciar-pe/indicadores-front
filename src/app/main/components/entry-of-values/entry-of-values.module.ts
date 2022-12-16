import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreCommonModule } from '@core/common.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { EntryOfValuesComponent } from 'app/main/components/entry-of-values/entry-of-values.component';
import { NgxMaskModule } from 'ngx-mask';
import { TabDirective } from './tab.directive';


@NgModule({
  declarations: [EntryOfValuesComponent, TabDirective],
  imports: [
    NgbModule,
    CoreCommonModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot()
  ],
  exports: [EntryOfValuesComponent],
  providers: [CurrencyPipe]
})
export class EntryOfValuesModule {}
