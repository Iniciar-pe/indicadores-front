import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { RatioComponent } from './ratio.component';
import { RatioService } from './ratio.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { EntryOfValuesModule } from 'app/main/components/entry-of-values/entry-of-values.module';
import { HeaderBusinessModule } from 'app/main/components/header-business/header-business.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GlossaryTermsModule } from 'app/main/components/glossary-terms/glossary-terms.module';


const routes: Routes = [
  {
    path: 'ratios',
    component: RatioComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [RatioComponent],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CoreTouchspinModule,
    EntryOfValuesModule,
    HeaderBusinessModule,
    NgxDatatableModule,
    GlossaryTermsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [RatioService],
})
export class RatioModule {}
