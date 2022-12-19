import { NgModule } from '@angular/core';

import { FilterPipe } from '@core/pipes/filter.pipe';

import { InitialsPipe } from '@core/pipes/initials.pipe';

import { SafePipe } from '@core/pipes/safe.pipe';
import { StripHtmlPipe } from '@core/pipes/stripHtml.pipe';
import { NameMonth } from '@core/pipes/name-month';
import { NamePeriod } from './name-period';
import { NameRatio } from './name-ratios.pipe';

@NgModule({
  declarations: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe, NameMonth, NamePeriod, NameRatio],
  imports: [],
  exports: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe, NameMonth, NamePeriod, NameRatio]
})
export class CorePipesModule {}
