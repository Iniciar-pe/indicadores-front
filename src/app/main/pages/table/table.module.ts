import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { PlantillaEditModule } from './table-edit/table-edit.module';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { TableComponent } from './table.component';
import { PlantillaService } from './table.service';


const routes: Routes = [
  {
    path: 'tabla',
    component: TableComponent,
    canActivate: [AuthGuard],
    resolve: {
      indicators: PlantillaService
    },
    data: { animation: 'tabla' }
  }
];

@NgModule({
  declarations: [TableComponent],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
    PlantillaEditModule,
  ],
  providers: [PlantillaService],
  
})
export class TableComponentModule {}
