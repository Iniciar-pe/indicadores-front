import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { DataEntryComponent } from './data-entry.component';
import { DataEntryService } from './data-entry.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { EntryOfValuesModule } from 'app/main/components/entry-of-values/entry-of-values.module';


const routes: Routes = [
  {
    path: 'entrada-de-datos',
    component: DataEntryComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [DataEntryComponent],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgSelectModule,
    CoreTouchspinModule,
    EntryOfValuesModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [DataEntryService],
  
})
export class DataEntryModule {}
