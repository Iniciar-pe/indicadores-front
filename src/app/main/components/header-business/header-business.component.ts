import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatePeriod } from 'app/main/pages/data-entry/data-entry.model';

@Component({
  selector: 'header-business',
  templateUrl: './header-business.component.html',
  styleUrls: ['./header-business.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderBusinessComponent implements OnInit {

  @Input('businesslist') businesslist;
  @Input('business') business;
  @Input('datePeriod') datePeriod: DatePeriod;
  @Output('getBusiness') getBusiness = new EventEmitter<any>();

  constructor() {}


  ngOnInit() {

  }

  setBusiness() {
    this.getBusiness.emit(this.business);
  }


}
