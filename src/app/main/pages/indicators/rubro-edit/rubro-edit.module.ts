import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { RubroEditComponent } from './rubro-edit.component';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';

@NgModule({
  declarations: [RubroEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreCommonModule,
    NgbModule,
    CoreTouchspinModule],
  exports: [RubroEditComponent]
})
export class RubroEditModule {}
