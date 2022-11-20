import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DragulaService } from 'ng2-dragula';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-modal-list-indicators',
  templateUrl: './modal-list-indicators.component.html',
  styleUrls: ['./modal-list-indicators.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalLiistIndicatorsComponent implements OnInit {


  private eventsSubscription: Subscription;

  @Input() events: Observable<boolean>;
  @ViewChild('modalForm') modalForm;
  correlativo = false;
  
  /**
   * Constructor
   *
   * @param {NgbModal} modalService
   */
  constructor(private modalService: NgbModal, dragulaService: DragulaService) {}

 
  // modal Open Form
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm);
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((correlativo) => {
      this.modalOpenForm(this.modalForm);
      this.correlativo = correlativo;
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
