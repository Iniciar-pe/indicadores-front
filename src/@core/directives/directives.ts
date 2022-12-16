import { NgModule } from '@angular/core';

import { FeatherIconDirective } from '@core/directives/core-feather-icons/core-feather-icons';
import { RippleEffectDirective } from '@core/directives/core-ripple-effect/core-ripple-effect.directive';
import { TagDirective } from '@core/directives/tag/tag';

@NgModule({
  declarations: [RippleEffectDirective, FeatherIconDirective, TagDirective],
  exports: [RippleEffectDirective, FeatherIconDirective, TagDirective]
})
export class CoreDirectivesModule {}
