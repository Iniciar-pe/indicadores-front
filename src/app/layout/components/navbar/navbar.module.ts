import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

import { CoreCommonModule } from '@core/common.module';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';

import { NavbarComponent } from 'app/layout/components/navbar/navbar.component';
import { NavbarBookmarkComponent } from 'app/layout/components/navbar/navbar-bookmark/navbar-bookmark.component';
import { NavbarSearchComponent } from 'app/layout/components/navbar/navbar-search/navbar-search.component';
import { NavbarCartComponent } from 'app/layout/components/navbar/navbar-cart/navbar-cart.component';
import { NavbarNotificationComponent } from 'app/layout/components/navbar/navbar-notification/navbar-notification.component';
import { ModalLicenseModule } from 'app/main/components/modal-license/modal-license.module';
import { CartService } from './cart.service';

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarSearchComponent,
    NavbarBookmarkComponent,
    NavbarCartComponent,
    NavbarNotificationComponent
  ],
  imports: [
    RouterModule,
    NgbModule,
    CoreCommonModule,
    PerfectScrollbarModule,
    CoreTouchspinModule,
    ModalLicenseModule,
  ],
  providers: [
    CartService,
  ],
  exports: [NavbarComponent]
})
export class NavbarModule {}
