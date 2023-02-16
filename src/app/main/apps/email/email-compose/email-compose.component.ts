import { Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EmailService } from 'app/main/apps/email/email.service';
import { DonateService } from 'app/main/pages/donate/donate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EmailComposeComponent implements OnInit {
  // Decorator
  @HostListener('keydown.escape') fn() {
    this.closeCompose();
  }
  @ViewChild('selectRef') private _selectRef: any;

  @Input() to: string;
  @Input() link: string;

  public emailCCSelected = [];
  public emailBCCSelected = [];

  public isOpenCC = false;
  public isOpenBCC = false;
  public emailSubject = '¡Esta invitado a usar Dr. Rate gratis!';
  public text: string;
  public isComposeOpen: boolean = false;
  public loading = false;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {EmailService} _emailService
   */
  constructor(
    private _emailService: EmailService,
    private donateService: DonateService,
    ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle CC & BCC
   *
   * @param toggleRef
   */
  togglCcBcc(toggleRef) {
    if (toggleRef == 'cc') {
      this.isOpenCC = !this.isOpenCC;
    } else {
      this.isOpenBCC = !this.isOpenBCC;
    }
  }

  /**
   * Close Compose
   */
  closeCompose() {
    this.isComposeOpen = false;
    this._emailService.composeEmail(this.isComposeOpen);
  }


  shendMail() {
    this.loading = true;
    this.text = `
    Estimado(a):<br>
    Tenemos el gusto de invitarte a utilizar Dr Rate para<br>
    tus indicadores financieros<br><br>
    ingrese aqui <a href="${this.link}">www.drate.com/invitacion</a><br><br>
    Sabemos que le sera de gran utilidad<br>
    `;
    const data = {
      mail: this.to,
      message: this.text,
    };

    this.donateService.mail(data).subscribe(response => {
      this.loading = false;
      this.isComposeOpen = false;
      this._emailService.composeEmail(this.isComposeOpen);
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado correctamente',
        text: '',
      });
    }, err => {
      this.loading = false;
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.text = `
    Estimado(a):<br>
    Tenemos el gusto de invitarte a utilizar Dr Rate para<br>
    tus indicadores financieros<br><br>
    ingrese aqui <a href="${this.link}">www.drate.com/invitacion</a><br><br>
    Sabemos que le sera de gran utilidad<br>
    `;
    // Subscribe to Compose Model Changes
    this._emailService.composeEmailChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.isComposeOpen = response;
      if (this.isComposeOpen) {
        setTimeout(() => {
          // this._selectRef.searchInput.nativeElement.focus();
        }, 0);
      }
    });
  }

  /**
   * On destroy
   */

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
