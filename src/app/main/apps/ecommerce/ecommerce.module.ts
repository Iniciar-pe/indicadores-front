import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { EcommerceService } from 'app/main/apps/ecommerce/ecommerce.service';
import { EcommerceItemComponent } from 'app/main/apps/ecommerce/ecommerce-item/ecommerce-item.component';
import { EcommerceWishlistComponent } from 'app/main/apps/ecommerce/ecommerce-wishlist/ecommerce-wishlist.component';
import { EcommerceCheckoutComponent } from 'app/main/apps/ecommerce/ecommerce-checkout/ecommerce-checkout.component';
import { EcommerceCheckoutItemComponent } from 'app/main/apps/ecommerce/ecommerce-checkout/ecommerce-checkout-item/ecommerce-checkout-item.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true
};

// routing
const routes: Routes = [
  {
    path: 'lista',
    component: EcommerceWishlistComponent,
    resolve: {
      ecommerce: EcommerceService
    },
    data: { animation: 'EcommerceWishlistComponent' }
  },
  {
    path: 'verificar',
    component: EcommerceCheckoutComponent,
    resolve: {
      ecommerce: EcommerceService
    },
    data: { animation: 'EcommerceCheckoutComponent' }
  },
];

@NgModule({
  declarations: [
    EcommerceWishlistComponent,
    EcommerceCheckoutComponent,
    EcommerceItemComponent,
    EcommerceCheckoutItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    FormsModule,
    CoreTouchspinModule,
    ContentHeaderModule,
    CoreSidebarModule,
    CoreCommonModule,
    NgbModule,
    NouisliderModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class EcommerceModule {}
