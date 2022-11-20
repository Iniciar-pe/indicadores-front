import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { IndicatorsComponent } from 'app/main/pages/indicators/indicators.component';
import { IndicatorsService } from 'app/main/pages/indicators/indicatorsFake.service';
import { IndicatorsEditModule } from './indicators-edit/indicators-edit.module';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { RubroEditModule } from './rubro-edit/rubro-edit.module';
import { ModalListIndicatorsModule } from 'app/main/components/modal-list-indicators/modal-list-indicators.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


const routes: Routes = [
  {
    path: 'indicadores',
    component: IndicatorsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'indicadores' }
  }
];

@NgModule({
  declarations: [IndicatorsComponent],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgxDatatableModule,
    IndicatorsEditModule,
    RubroEditModule,
    ModalListIndicatorsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [IndicatorsService],
  
})
export class IndicatorsModule {}
