import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { DonateComponent } from './donate.component';
import { DonateService } from './donate.service';
import { EmailService } from 'app/main/apps/email/email.service';
import { EmailComposeComponent } from 'app/main/apps/email/email-compose/email-compose.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


const routes: Routes = [
  {
    path: 'donar',
    component: DonateComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    DonateComponent,
    EmailComposeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    NgSelectModule,
    QuillModule.forRoot(),
    CorePipesModule,
    CoreSidebarModule,
    PerfectScrollbarModule
  ],
  providers: [DonateService, EmailService],
})
export class DonateModule {}
