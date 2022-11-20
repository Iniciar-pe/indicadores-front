import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { PlanEditModule } from './plan-edit/plan-edit.module';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { PlanComponent } from './plan.component';
import { PlanService } from './plan.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


const routes: Routes = [
  {
    path: 'planes',
    component: PlanComponent,
    canActivate: [AuthGuard],
    data: { animation: 'planes' }
  }
];

@NgModule({
  declarations: [PlanComponent],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgxDatatableModule,
    PlanEditModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [PlanService],
  
})
export class PlanComponentModule {}
