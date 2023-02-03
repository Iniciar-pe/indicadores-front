import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { DistributionEditModule } from './distribution-edit/distribution-edit.module';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { DistributionComponent } from './distribution.component';
import { DistributionService } from './distribution.service';


const routes: Routes = [
  {
    path: 'distribution',
    component: DistributionComponent,
    canActivate: [AuthGuard],
    data: { animation: 'distribution' }
  }
];

@NgModule({
  declarations: [DistributionComponent],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
    DistributionEditModule,
  ],
  providers: [DistributionService],
})
export class DistributionModule {}
