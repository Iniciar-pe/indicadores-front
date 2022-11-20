import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-modal-license',
  templateUrl: './modal-license.component.html',
  styleUrls: ['./modal-license.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalLicenseComponent implements OnInit {


  private eventsSubscription: Subscription;

  @Input() events: Observable<void>;
  @ViewChild('modalForm') modalForm;
  public planSelected = '';
  public licensseSelected = '';
  public paqueteSelected = '';

  binding = '';
  
  /**
   * Constructor
   *
   * @param {NgbModal} modalService
   */
  constructor(private modalService: NgbModal) {}

  planChange(event){
    this.planSelected = event.target.value;
  }

  licensseChange(event){
    this.licensseSelected = event.target.value;
  }

  paqueteChange(event){
    this.paqueteSelected =  event.target.value;
  }

  // modal Open Form
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm);
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => this.modalOpenForm(this.modalForm));
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
