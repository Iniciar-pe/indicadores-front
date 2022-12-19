import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanService } from '../../plan/plan.service';
import { Rubro, RubroRequest } from '../indicators.model';
import { IndicatorsService } from '../indicators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rubro-edit',
  templateUrl: './rubro-edit.component.html'
})
export class RubroEditComponent implements OnInit {
  // input variable
  @Input() entry: Rubro;
  @Output() back: EventEmitter<any>;;
  form: FormGroup;
  public submitted = false;
  numberValue = 0;
  loading = false;
  get f() {
    return this.form.controls;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _indicatorsService: IndicatorsService
  ) {
    this.back = new EventEmitter<any>();
  }

  submitEntry() {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const entryR = {
      id: this.entry.id_rubro,
      description: this.f.description.value,
      mnemonic: this.f.nemonic.value,
      status: this.f.status.value ? 'A' : 'I',
      edita_pp: this.f.edita_pp.value ? 'A' : 'I',
      edita_pa: this.f.edita_pa.value ? 'A' : 'I',
      notas: this.f.notas.value,
      orden: this.f.orden.value,
    }

    if (this.form.valid && this.entry && this.entry.id_rubro) {
      this._indicatorsService.edit(entryR).subscribe(e => {
        this.loading = false;
        this.back.emit(false);
      }, err => this.messageError());
      //this.submit.emit(this.form.value);
    } else {
      this._indicatorsService.add(entryR).subscribe(e => {
        this.loading = false;
        this.back.emit(false);
      }, err => this.messageError());
    }

  }

  backRubro() {
    this.back.emit(false);
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

  countChange(value) {
    this.f['orden'].setValue(value);
    console.log(value);
    this.submitted = false;
  }

  ngOnInit() {
    this.numberValue = Number(this.entry.orden);
    this.form =this._formBuilder.group({
      status: [this.entry.estado == 'A', [Validators.required]],
      description: [this.entry.descripcion, [Validators.required]],
      nemonic: [this.entry.nemonico, [Validators.required]],
      edita_pp: [this.entry.edita_pp === 'A'],
      edita_pa: [this.entry.edita_pa === 'A'],
      notas: [this.entry.notas, [Validators.required]],
      orden: [this.entry.orden, [Validators.required]],
    });
  }
}
