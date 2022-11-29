import { NgModule } from '@angular/core';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderBusinessComponent } from 'app/main/components/header-business/header-business.component';


@NgModule({
  declarations: [HeaderBusinessComponent],
  imports: [
    NgbModule,
    CoreCommonModule,
    NgSelectModule,
  ],
  exports: [HeaderBusinessComponent],
  providers: []
})
export class HeaderBusinessModule {}
