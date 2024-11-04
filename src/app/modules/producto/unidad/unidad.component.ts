import { Component } from '@angular/core';
// Importaciones pertinentes para trasladar acá la BD y la interfaz de Productos
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../admin/services/crud.service';
// Sweet alert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent {

  coleccionProductos: Producto[] = [];

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto.filter(producto => producto.categoria === 'unidad');

    })
  }
  carrito(){
    Swal.fire({
      title: "Oops",
      text: "Este boton no está listo todavía",
      icon: "warning"
    });
  }
}
/*
Exporto la informacion que estoy recibiendo desde la tabla del administrador
*/
