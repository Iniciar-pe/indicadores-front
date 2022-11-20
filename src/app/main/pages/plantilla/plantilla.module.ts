import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { PlantillaEditModule } from './plantilla-edit/plantilla-edit.module';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { PlantillaComponent } from './plantilla.component';
import { PlantillaService } from './plantilla.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


const routes: Routes = [
  {
    path: 'plantilla',
    component: PlantillaComponent,
    canActivate: [AuthGuard],
    data: { animation: 'plantilla' }
  }
];

@NgModule({
  declarations: [PlantillaComponent],
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
    SweetAlert2Module.forRoot()
  ],
  providers: [PlantillaService],
  
})
export class PlantillaModule {}
