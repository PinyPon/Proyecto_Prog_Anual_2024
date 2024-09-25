import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../admin/services/crud.service';

@Component({
  selector: 'app-rcasamiento',
  templateUrl: './rcasamiento.component.html',
  styleUrls: ['./rcasamiento.component.css']
})
export class RcasamientoComponent {
  coleccionProductos: Producto[] = [];

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    // subscribe -> método de notificación de cambios (observable)
    this.servicioCrud.obtenerProducto().subscribe(producto => {

      this.coleccionProductos = producto.filter(producto => producto.categoria === 'Ramo Casamiento');

    })
  }
}
