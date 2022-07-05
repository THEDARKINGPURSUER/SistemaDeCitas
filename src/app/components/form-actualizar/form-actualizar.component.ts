import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { PersonasService } from 'src/app/service/personas.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-actualizar',
  templateUrl: './form-actualizar.component.html',
  styleUrls: ['./form-actualizar.component.css']
})
export class FormActualizarComponent implements OnInit {

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  createFormGroup(){
    return new UntypedFormGroup({
      idcitas: new UntypedFormControl(0),
      identificacion: new UntypedFormControl('', [Validators.required, Validators.minLength(5)]), 
      diaCita: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]), 
      horaCita: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]), 
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
  
  constructor( private personaService: PersonasService, private router: Router, private activedRoute: ActivatedRoute) { 
    this.contactForm = this.createFormGroup();
   }
  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params['id']) {
      this.personaService.getPersona(params['id'])
        .subscribe(
          res => {
            res.find((object: object) => {
              this.contactForm.patchValue(object)
              console.log(object);
            })            
          },
          err => console.log(err)
        )
    }
  }

  updatePersona(){
      if (this.contactForm.valid) {
        Swal.fire({
          title: '¿Desea actualizar estos datos?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          denyButtonText: `Salir`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.personaService.updatePersona(this.contactForm.value.idcitas , this.contactForm.value)
            .subscribe(
                res => {
                  console.log(res);
                  console.log("Valores del formulario",this.contactForm.value);
                  this.router.navigate(['/app']);
                },
                err => {
                  console.log(err);
                }
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
  get diaCita(): any { return this.contactForm.get('diaCita'); }
  get horaCita(): any { return this.contactForm.get('horaCita'); }
  get nombre(): any { return this.contactForm.get('nombre'); }
  get apellido(): any { return this.contactForm.get('apellido'); }
  get nacimiento(): any { return this.contactForm.get('nacimiento'); }
  get consulta(): any { return this.contactForm.get('consulta'); }
  get email(): any { return this.contactForm.get('email'); }
  get observaciones(): any { return this.contactForm.get('observaciones'); }
}