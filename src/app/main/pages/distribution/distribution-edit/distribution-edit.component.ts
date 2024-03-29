import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Business } from '../../data-entry/data-entry.model';
import { DistributionModel, Group } from '../distribution.model';
import { DistributionService } from '../distribution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-distribution-edit',
  templateUrl: './distribution-edit.component.html',
  styleUrls: ['./distribution-edit.component.scss']
})
export class DistributionEditComponent implements OnInit {
  // input variable
  @Input() distribution: DistributionModel;
  @Input() typeBusiness: string;
  @Output() back = new EventEmitter<any>();
  public business: Business[];
  public group: Group[];
  public id = 0;
  public ruc = '';
  public name = '';
  public form: FormGroup;
  public submitted = false;
  public loadingModal = false;
  public loading = false;
  public type;
  public businessType = '';
  public father = '';
  public submittedModal = false;

  get f() {
    return this.form.controls;
  }

  get listB() {
    return this.business.filter(item => item.type === '2');
  }

  constructor(
    private distributionService: DistributionService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.formControl();
    this.getBusiness();
    this.getGroup();
  }

  getBusiness() {
    this.distributionService.getBusiness(this.typeBusiness).subscribe(response => {
      this.getListBusiness(this.distribution.id);
      this.business = response.business;
      this.loadingModal = false;
      this.modalService.dismissAll();
    }, err => {
      this.loadingModal = false;
      this.modalService.dismissAll();
    });
  }

  getGroup() {
    this.distributionService.getGroup().subscribe(response => {
      this.group = response.group;
    });
  }

  formControl() {
    this.form = this._formBuilder.group({
      status: [this.distribution.status === 'A', [Validators.required]],
      name: [this.distribution.name, [Validators.required]],
      email: [this.distribution.email, [Validators.required]],
      lastName: [this.distribution.lastName, [Validators.required]],
      password: ['']
    });
  }

  modalOpenSLCIM(modalSLCIM, type: number,  item: Business = null) {
    this.submittedModal = false;
    this.type = type;
    if (item) {
      this.ruc = item.ruc;
      this.name = item.name;
      this.id = item.id;
    }
    this.modalService.open(modalSLCIM, {
      scrollable: true,
      size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }

  addBusiness() {
    this.submittedModal = true;

    if (this.ruc === '') {
      return false;
    }

    if (this.name === '') {
      return false;
    }

    if (this.typeBusiness === '2' && this.ruc === '') {
      return false;
    }

    if (this.typeBusiness === '2' && this.ruc === '') {
      return false;
    }

    this.loadingModal = true;
    const data = {
      id: this.id,
      business: this.name,
      ruc: '' + this.ruc,
      status: 'A',
      type: this.businessType !== '' ?  this.businessType : '1',
      index: this.father !== '' ? this.father : '0',
    };

    if (this.type === 0) {
      this.distributionService.addBusiness(data).subscribe(response => {
        this.getBusiness();
      }, err => {
        this.loadingModal = false;
      });
    } else {
      this.distributionService.editBusiness(data).subscribe(response => {
        this.getBusiness();
      }, err => {
        this.loadingModal = false;
      });
    }
  }

  getListBusiness(user) {
    if (user) {
      this.distributionService.getListBusiness(user).subscribe(item => {
        const data = item.listBusiness.map(value => {
          return value.business;
        });

        this.business = this.business.map(value => {
          if (data.find(valor => valor === value.id)) {
            value.isActive = true;
          }
          return value;
        });
      });
    }

  }

  submitPlan() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const data = {
      user: this.distribution.id,
      email: this.f.email.value,
      lastName: this.f.lastName.value,
      name: this.f.name.value,
      plan: this.group.filter(item => item.id === this.distribution.group)[0].plan,
      password: this.f.password.value,
      group: this.distribution.group,
      detail: JSON.stringify(this.business.filter(item => item.isActive === true)),
    };
    if (this.distribution.id) {
      this.distributionService.editLicenses(data).subscribe(response => {
        this.goBack();
        this.loading = false;
      }, err => this.loading = false);
    } else {
      this.distributionService.add(data).subscribe(response => {
        this.goBack();
        this.loading = false;
      }, err => this.loading = false);
    }

  }

  goBack() {
    this.back.emit(false);
  }

  deleteBusiness(item) {
    this.distributionService.deleteBusiness({id: item.id}).subscribe(response => {
      this.getBusiness();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Empresa viculada',
        text: 'No se puede eliminar esta empresa.',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
      });
    });
  }

  validateGroup(item) {
    return !item.isActive && this.group?.filter(value => value.id === this.distribution.group && value.cant >= value.number).length > 0;

  }

}
