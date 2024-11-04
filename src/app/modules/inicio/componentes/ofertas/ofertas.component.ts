import { Component } from '@angular/core';

import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { Producto } from 'src/app/models/producto';

// IMPORTAMOS INTERFAZ
import { Flores } from 'src/app/models/flores';

// Sweet alert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})


export class OfertasComponent {
  coleccionProductos: Producto[] = [];

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(productos => {
      this.coleccionProductos = productos.filter(producto => producto.oferta);
    });
  }
}
/*
Exporto la informacion que estoy recibiendo desde la tabla del administrador
*/
