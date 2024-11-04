import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../admin/services/crud.service';

// Sweet alert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-rmedianos',
  templateUrl: './rmedianos.component.html',
  styleUrls: ['./rmedianos.component.css']
})
export class RmedianosComponent {
  // Creamos colección local de productos -> la definimos como array
  coleccionProductos: Producto[] = [];

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    // subscribe -> método de notificación de cambios (observable)
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto.filter(producto => producto.categoria === 'Ramo Mediano');

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



/** 
 * import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../admin/services/crud.service';


 * coleccionProductos: Producto[] = [];

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    // subscribe -> método de notificación de cambios (observable)
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;

    })
  } */