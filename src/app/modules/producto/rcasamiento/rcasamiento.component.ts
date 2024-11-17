import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../admin/services/crud.service';

// Sweet alert
import Swal from 'sweetalert2'
import { CarritoService } from '../../carrito/services/carrito.service';

@Component({
  selector: 'app-rcasamiento',
  templateUrl: './rcasamiento.component.html',
  styleUrls: ['./rcasamiento.component.css']
})
export class RcasamientoComponent {
  coleccionProductos: Producto[] = [];
  stock : number = 0;
  



  constructor(public servicioCrud: CrudService,
    public servicioCarrito: CarritoService

  ) { }

  ngOnInit(): void {
    // subscribe -> método de notificación de cambios (observable)
    this.servicioCrud.obtenerProducto().subscribe(producto => {

      // Filtro para que solo las card se cierta categoria se muestren en esta pagina
      this.coleccionProductos = producto.filter(producto => producto.categoria === 'Ramo Casamiento');

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
