import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreCommonModule } from '@core/common.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NgxMaskModule } from 'ngx-mask';
import { GlossaryTermsComponent } from './glossary-terms.component';


@NgModule({
  declarations: [GlossaryTermsComponent],
  imports: [
    NgbModule,
    CoreCommonModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot()
  ],
  exports: [GlossaryTermsComponent],
  providers: [CurrencyPipe]
})
export class GlossaryTermsModule {}
