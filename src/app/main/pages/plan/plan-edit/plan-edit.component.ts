import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plan } from '../plan.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanService } from '../plan.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.scss']
})
export class PlanEditComponent implements OnInit {
  // input variable
  @Input() plan: Plan;
  @Input() validateType: boolean;
  @Output() back = new EventEmitter<any>();
  form: FormGroup;
  public submitted = false;
  loading = false;
  get f() {
    return this.form.controls;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _planService: PlanService,
    private _toastrService: ToastrService
  ) { }

  backUserEdit() {
    this.back.emit(false);
  }

  submitPlan() {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const planR = {
      id: this.plan.id_plan,
      description: this.f.description.value,
      number: this.f.number.value,
      price: String(this.f.price.value),
      type: this.f.type.value,
      status: this.f.status.value ? 'A' : 'I'
    }

    if (this.form.valid && this.plan && this.plan.id_plan) {
      this._planService.edit(planR).subscribe(e => {
        this.loading = false;
        this.back.emit(false);
      }, err => this.messageError());
      //this.submit.emit(this.form.value);
    } else {
      this._planService.add(planR).subscribe(e => {
        this.loading = false;
        this.back.emit(false);
      }, err => this.messageError());
    }
  }

  messageError(){
    this.loading = false;
    Swal.fire({
      icon: 'error',
      title: 'Se ha producido un error',
      text: 'intente dentro de unos minutos.',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'btn btn-danger'
      },
    });
  }

  ngOnInit() {

    this.form =this._formBuilder.group({
      status: [this.plan.estado == 'A', [Validators.required]],
      description: [this.plan.descripcion, [Validators.required]],
      type: [this.plan.tipo, [Validators.required]],
      number: [this.plan.numero, [Validators.required]],
      price: [this.plan.precio, [Validators.required]]
    });
  
  }
}
