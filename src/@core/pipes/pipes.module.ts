import { NgModule } from '@angular/core';

import { FilterPipe } from '@core/pipes/filter.pipe';

import { InitialsPipe } from '@core/pipes/initials.pipe';

import { SafePipe } from '@core/pipes/safe.pipe';
import { StripHtmlPipe } from '@core/pipes/stripHtml.pipe';
import { NameMonth } from '@core/pipes/name-month';
import { NamePeriod } from './name-period';

@NgModule({
  declarations: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe, NameMonth, NamePeriod],
  imports: [],
  exports: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe, NameMonth, NamePeriod]
})
export class CorePipesModule {}
