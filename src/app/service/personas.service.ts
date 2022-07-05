import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Persona } from "../models/Persona";


@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient) { }


  API_URI = 'http://localhost:3000'

  getPersonas() {
    return this.http.get<Persona[]>(`${this.API_URI}/personas`);
  }

  getPersona(id: string|number) {
    return this.http.get<Persona[]>(`${this.API_URI}/personas/${id}`);
  }

  deletePersona(id: string) {
    return this.http.delete<Persona[]>(`${this.API_URI}/personas/${id}`);
  }

  savePersona(cita: Persona) {
    return this.http.post<Persona[]>(`${this.API_URI}/personas`, cita);
  }

  updatePersona(id: string|number, updatedGame: Persona) {
    return this.http.put<Persona[]>(`${this.API_URI}/personas/${id}`, updatedGame);
 }

 mensaje: string = "";
 private enviarMensajeSubject = new Subject<string>();
 enviarMensajeObservable = this.enviarMensajeSubject.asObservable();

 enviarMensaje(mensaje: string) {
   this.mensaje = mensaje;
   this.enviarMensajeSubject.next(mensaje);
 }

}
