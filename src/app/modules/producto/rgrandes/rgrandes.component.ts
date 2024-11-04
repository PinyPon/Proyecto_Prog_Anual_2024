import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../admin/services/crud.service';

// Sweet alert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-rgrandes',
  templateUrl: './rgrandes.component.html',
  styleUrls: ['./rgrandes.component.css']
})
export class RgrandesComponent {
  coleccionProductos: Producto[] = [];

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto.filter(producto => producto.categoria === 'Ramo Grande');

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