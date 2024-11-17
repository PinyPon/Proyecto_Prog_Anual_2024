import { Component } from '@angular/core';

import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { Producto } from 'src/app/models/producto';

// IMPORTAMOS INTERFAZ
import { Flores } from 'src/app/models/flores';

// Sweet alert
import Swal from 'sweetalert2'
import { CarritoService } from 'src/app/modules/carrito/services/carrito.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})


export class OfertasComponent {

  stock : number = 0;
  
  coleccionProductos: Producto[] = [];


  constructor(
    public servicioCrud: CrudService,
    public servicioCarrito: CarritoService
  ) { }

  ngOnInit(): void {
    /*console.log("En este instante el componente ofertas ha cargado");
    alert ("En este instante el componente ofertas ha cargado");*/
       
    this.servicioCrud.obtenerProducto().subscribe(productos => {
      this.coleccionProductos = productos.filter(producto => producto.oferta === 'true');

      //alert("002");
      //console.log(productos.filter(producto => producto.oferta));

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
