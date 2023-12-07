import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { AbstractComponent } from './abstract.component';
import { AbstractService } from './abstract.service';
import { HeaderBusinessModule } from 'app/main/components/header-business/header-business.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Routes = [
  {
    path: 'resumen',
    component: AbstractComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [AbstractComponent],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    HeaderBusinessModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [AbstractService],
})
export class AbstractModule {}
