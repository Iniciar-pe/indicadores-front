import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DistributionModel } from '../distribution.model';

@Component({
  selector: 'app-distribution-edit',
  templateUrl: './distribution-edit.component.html',
  styleUrls: ['./distribution-edit.component.scss']
})
export class DistributionEditComponent implements OnInit {
  // input variable
  @Input() distribution: DistributionModel;
  @Output() back: EventEmitter<any>;

  constructor() {
  }

  ngOnInit() {
    console.log(this.distribution);
  }
}
