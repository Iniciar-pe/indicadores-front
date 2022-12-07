import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Indicator } from '../indicators.model';
import { IndicatorsService } from '../indicators.service';
import Swal from 'sweetalert2';
import { Template } from '../../plantilla/template.model';

@Component({
  selector: 'app-indicators-edit',
  templateUrl: './indicators-edit.component.html',
  styleUrls: ['./indicators-edit.component.scss']
})
export class IndicatorsEditComponent implements OnInit {
  form: FormGroup;
  public submitted = false;
  numberValue = 0;
  loading = false;
  get f() {
    return this.form.controls;
  }
  // input variable
  @Input() indicatorData: Indicator;
  @Output() back: EventEmitter<any>;
  @Input() template: any;

  constructor(private _formBuilder: FormBuilder,private _indicatorsService: IndicatorsService) {
    this.back = new EventEmitter<any>();
  }


  backIndicators() {
    this.back.emit(false);
  }

  ngOnInit() {
    this.numberValue = Number(this.indicatorData.orden);
    this.form =this._formBuilder.group({
      status: [this.indicatorData.estado == 'A'],
      description: [this.indicatorData.descripcion, [Validators.required]],
      name: [this.indicatorData.nombre, [Validators.required]],
      type: [this.indicatorData.tipo, [Validators.required]],
      formula: [this.indicatorData.formula, [Validators.required]],
      public: [this.indicatorData.publico, [Validators.required]],
      order: [this.indicatorData.orden, [Validators.required]],
      expressed: [this.indicatorData.expresado, [Validators.required]],
      detalle_resultado: [this.indicatorData.detalle_resultado],
   });
  }

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      icono: file,
    });
  }

  submitIndicator() {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const data: any = new FormData();
    data.append('id', this.indicatorData.id_indicador);
    data.append('description', this.f.description.value);
    data.append('name', this.f.name.value);
    data.append('type', this.f.type.value);
    data.append('formula', this.f.formula.value);
    data.append('public', this.f.public.value);
    data.append('order', this.f.order.value);
    data.append('expressed', this.f.expressed.value);
    data.append('detalle_resultado', this.f.detalle_resultado.value);
    data.append('status', this.f.status.value ? 'A' : 'I');
    

    if (this.form.valid && this.indicatorData && this.indicatorData.id_indicador) {
      this._indicatorsService.editIndicator(data).subscribe(e => {
        this.loading = false;
        this.back.emit(false);
      }, err => this.messageError());
      //this.submit.emit(this.form.value);
    } else {
      this._indicatorsService.addIndicator(data).subscribe(e => {
        this.loading = false;
        this.back.emit(false);
      }, err => this.messageError());
    }
  }

  countChange(value) {
    this.f['order'].setValue(value);
    console.log(value);
    this.submitted = false;
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
}
