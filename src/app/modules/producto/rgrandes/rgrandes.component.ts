import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../admin/services/crud.service';

// Sweet alert
import Swal from 'sweetalert2'
import { CarritoService } from '../../carrito/services/carrito.service';

@Component({
  selector: 'app-rgrandes',
  templateUrl: './rgrandes.component.html',
  styleUrls: ['./rgrandes.component.css']
})
export class RgrandesComponent {
  coleccionProductos: Producto[] = [];

  stock : number = 0;

  constructor(
    public servicioCrud: CrudService,
    public servicioCarrito: CarritoService
  ) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto.filter(producto => producto.categoria === 'Ramo Grande');

    })
  }
 

  agregarProducto(info : Producto){
    const stockDeseado = Math.trunc(this.stock);
    if (stockDeseado<=0 || stockDeseado > info.stock) {
      Swal.fire({
        title:'Error',
        text:'No hay tanto estock',
        icon: 'error'
      })
    } else {
      this.servicioCarrito.crearPedido(info, stockDeseado);
    }
  }
}
/*
Exporto la informacion que estoy recibiendo desde la tabla del administrador
*/