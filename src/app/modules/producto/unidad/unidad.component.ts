import { Component } from '@angular/core';
// Importaciones pertinentes para trasladar acá la BD y la interfaz de Productos
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../admin/services/crud.service';
// Sweet alert
import Swal from 'sweetalert2'
import { CarritoService } from '../../carrito/services/carrito.service';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent {

  coleccionProductos: Producto[] = [];

  stock : number = 0;

  constructor(public servicioCrud: CrudService,
    public servicioCarrito: CarritoService

  ) { }

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
  agregarProducto(info : Producto){
    const stockDeseado = Math.trunc(this.stock);
   
      this.servicioCarrito.crearPedido(info, stockDeseado);
  
  }
}
/*
Exporto la informacion que estoy recibiendo desde la tabla del administrador
*/
