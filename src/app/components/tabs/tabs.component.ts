import { Component, OnInit } from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormularioComponent } from '../formulario/formulario.component';
import { InicioComponent } from '../inicio/inicio.component';
import { ListaComponent } from '../lista/lista.component';
import { PersonasService } from 'src/app/service/personas.service';



@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit{
  mensaje: string = "INICIO";

  ngOnInit(): void {
    this.addTab(true, 'Inicio', '')

    this.personaService.enviarMensajeObservable.subscribe(
      res => {
        this.mensaje = res
      },
      err => {
        console.log(err);
      }
    )
  }
  
  formulario = FormularioComponent
  lista = ListaComponent
  inicio = InicioComponent

  tabs: any[] = [];
  selected = new UntypedFormControl(0);
  i = FormularioComponent
  private tab: {} = {};
  constructor(private personaService: PersonasService){
    
  }
  addTab(selectAfterAdding: boolean, ventana: string, selector: any) {
    switch (ventana) {
      case 'Inicio':
        this.tab = {ventana: ventana, selector: this.tabs.length === 0 ? this.inicio: this.inicio};
        this.tabs.push(this.tab);
        break;
      case 'Formulario':
        this.tab = {ventana: ventana, selector: this.tabs.length === 0 ? this.formulario: this.formulario};
        this.tabs.push(this.tab);
        break;
      case 'Agenda':
        this.tab = {ventana: ventana, selector: this.tabs.length === 0 ? this.lista: this.lista};
        this.tabs.push(this.tab);
        break; 
    }

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }
  
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }


  cambioTexto(event: MatTabChangeEvent) {
    this.personaService.enviarMensaje(event.tab.textLabel)
 
  }
}

