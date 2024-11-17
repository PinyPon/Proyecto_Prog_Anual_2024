import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../admin/services/crud.service';

// Sweet alert
import Swal from 'sweetalert2'
import { CarritoService } from '../../carrito/services/carrito.service';

@Component({
  selector: 'app-rmedianos',
  templateUrl: './rmedianos.component.html',
  styleUrls: ['./rmedianos.component.css']
})
export class RmedianosComponent {
  // Creamos colección local de productos -> la definimos como array
  coleccionProductos: Producto[] = [];

  stock : number = 0;

  constructor(public servicioCrud: CrudService,
    public servicioCarrito: CarritoService

  ) { }

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
  agregarProducto(info : Producto){
    const stockDeseado = Math.trunc(this.stock);
   
      this.servicioCarrito.crearPedido(info, stockDeseado);
  
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