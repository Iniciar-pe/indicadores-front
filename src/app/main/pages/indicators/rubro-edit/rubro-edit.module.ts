import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { RubroEditComponent } from './rubro-edit.component';

@NgModule({
  declarations: [RubroEditComponent],
  imports: [CommonModule, RouterModule, CoreCommonModule, NgbModule],
  exports: [RubroEditComponent]
})
export class RubroEditModule {}
