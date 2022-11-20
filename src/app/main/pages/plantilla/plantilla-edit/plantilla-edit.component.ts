import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { PlantillaService } from '../plantilla.service';
import { Template } from '../template.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-plantilla-edit',
  templateUrl: './plantilla-edit.component.html',
  styleUrls: ['./plantilla-edit.component.scss']
})
export class PlantillaEditComponent implements OnInit {
  // input variable
  url = environment.apiUrl;
  @Input() template: Template;
  @Output() back: EventEmitter<any>;
  form: FormGroup;
  public submitted = false;
  loading = false;
  get f() {
    return this.form.controls;
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _plantillaService: PlantillaService) {
    this.back = new EventEmitter<any>();
  }

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      name: file,
    })
  }

  backUserEdit() {
    this.back.emit(false);
  }

  submit() {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const data: any = new FormData();
    data.append('id', this.template.id_plantilla);
    data.append('description', this.f.description.value);
    data.append('name', this.f.name.value);
    data.append('status', this.f.status.value ? 'A' : 'I');

    if (this.form.valid && this.template && this.template.id_plantilla) {
      
      this._plantillaService.edit(data).subscribe(e => {
        this.loading = false;
        this.back.emit(false);
      }, err => this.messageError());
      
    } else {
      this._plantillaService.add(data).subscribe(e => {
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
    this.form = this._formBuilder.group({
      status: [this.template.estado == 'A', [Validators.required]],
      description: [this.template.descripcion, [Validators.required]],
      name: [''],
    });

  }
}
