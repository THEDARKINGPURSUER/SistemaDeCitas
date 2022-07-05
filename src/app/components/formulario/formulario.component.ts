import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'src/app/service/personas.service';
import Swal from 'sweetalert2';
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  
  ngOnInit(): void {
  }

  fecha: string = moment().format("yyyy-MM-DD");
  hora: string = moment().format('HH:mm')
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
  createFormGroup(){
    return new UntypedFormGroup({
      idcitas: new UntypedFormControl(0),
      identificacion: new UntypedFormControl('', [Validators.required, Validators.minLength(5)]), 
      diaCita: new UntypedFormControl(this.fecha, [Validators.required, Validators.minLength(5)]), 
      horaCita: new UntypedFormControl(this.hora, [Validators.required, Validators.minLength(5)]), 
      nombre: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]), 
      apellido: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]), 
      telefono: new UntypedFormControl(''), 
      email: new UntypedFormControl('', [Validators.pattern(this.emailPattern), Validators.minLength(5)]), 
      municipio: new UntypedFormControl(''), 
      departamento: new UntypedFormControl(''), 
      nacimiento: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]), 
      consulta: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]), 
      atencion: new UntypedFormControl(''), 
      contrato: new UntypedFormControl(''), 
      plantilla: new UntypedFormControl(''), 
      observaciones: new UntypedFormControl('', [Validators.maxLength(100)]),
    })
  }
  contactForm: UntypedFormGroup;

  constructor( private personaService: PersonasService) {
    this.contactForm = this.createFormGroup();
   }



  savePersona(){
    if (this.contactForm.valid) {
      Swal.fire({
        title: '¿Desea asignar esta cita?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `Salir`,
      }).then((result) => {
        if (result.isConfirmed) {
          delete this.contactForm.value.idCitas;
          this.personaService.savePersona(this.contactForm.value)
          .subscribe(
            res => {
              console.log(res);
              this.contactForm.reset();
            },
            err => console.log(err)
          )
          Swal.fire('Guardado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Los cambios no se guardan', '', 'info')
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Complete los campos requeridos!',
        footer: '<p style="color: red;">No se enviaran los datos</p>'
      })
    }
  }

  get identificacion(): any { return this.contactForm.get('identificacion'); }
  get email(): any { return this.contactForm.get('email'); }
  get diaCita(): any { return this.contactForm.get('diaCita'); }
  get horaCita(): any { return this.contactForm.get('horaCita'); }
  get nombre(): any { return this.contactForm.get('nombre'); }
  get apellido(): any { return this.contactForm.get('apellido'); }
  get nacimiento(): any { return this.contactForm.get('nacimiento'); }
  get consulta(): any { return this.contactForm.get('consulta'); }
  get observaciones(): any { return this.contactForm.get('observaciones'); }

}
