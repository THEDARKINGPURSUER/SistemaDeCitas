import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PersonasService } from 'src/app/service/personas.service';
import Swal from 'sweetalert2';
import { Persona } from "../../models/Persona";
import {MatPaginator} from '@angular/material/paginator';
import * as moment from 'moment';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit, AfterViewInit{

  fecha: string = moment().format();
  hora: string = moment().format('HH:mm')

  displayedColumns: string[] = ['Opciones', 'fecha', 'Nombre', 'Identificacion', 'Hora', 'atencion', 'observaciones'];
  dataSource = new MatTableDataSource<Persona>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private personaService: PersonasService) { }

  ngOnInit(): void { 
    this.getPersonas()
    this.personaService.enviarMensajeObservable.subscribe(
      res => {
        this.getPersonas();
      },
      err => {
        console.log(err);
      }
    )
  }

  getPersonas(){
    this.personaService.getPersonas().subscribe(
      res => {
        this.dataSource.data = res;
        console.log(this.dataSource.data);
        
      },
      err => console.error(err)
    )
  }

  deletePersona(id: string){
    Swal.fire({
      title: 'Seguro que desea eliminar este usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Salir`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
          this.personaService.deletePersona(id).subscribe(
            res => {
              console.log(res);
              this.getPersonas();
            },
            err => console.log(err)
          )        
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se guardan', '', 'info')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  next(){
    const idTable: any = document.getElementById("table")
    idTable.scrollLeft += 156
 
  }
  previus(){
    const idTable: any = document.getElementById("table")
    idTable.scrollLeft -= 156
  }
}
