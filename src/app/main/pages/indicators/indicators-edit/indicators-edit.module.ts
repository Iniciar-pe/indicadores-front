import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { IndicatorsEditComponent } from './indicators-edit.component';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';

@NgModule({
  declarations: [IndicatorsEditComponent],
  imports: [
    CommonModule, 
    RouterModule, 
    CoreCommonModule, 
    NgbModule, 
    CoreTouchspinModule,
    FormsModule],
  exports: [IndicatorsEditComponent]
})
export class IndicatorsEditModule {}
