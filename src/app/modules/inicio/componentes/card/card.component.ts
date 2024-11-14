import { Component } from '@angular/core';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { Producto } from 'src/app/models/producto';

// IMPORTAMOS INTERFAZ
import { Flores } from 'src/app/models/flores';

// Sweet alert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  coleccionProductos: Producto[] = [];

  coleccionFiltrada: Producto[] = [];   // Colección filtrada (sin los productos de la categoría "oferta")
  
  coleccionOfertas: Producto[] = [];

  coleccionGeneral: Producto[] = [];

  mostrarMas: boolean = false;

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    // subscribe -> método de notificación de cambios (observable)
    this.servicioCrud.obtenerProducto().subscribe(productos => {
      // Filtramos los productos para excluir los que estén en la categoría "ofertas"
      this.coleccionProductos = productos;
      this.filtrarProductos();
    });
  }
  // IMPORTAR LA INTERFAZ DE Flores -> INICIALIZAR
  flor: Producto = {
    idProducto: '', // -> inicializamos con comillas simples porque es tipo STRING
    nombre: '',
    descripcion: '',
    oferta: false,
    categoria: '',
    precio: 0,
    imagen: '',
    alt: '',
    stock: 0
  }

  compra(producto: Producto) {
    this.flor.nombre = producto.nombre
    this.flor.descripcion = producto.descripcion
    this.flor.oferta = producto.oferta
    this.flor.precio = producto.precio
    this.flor.imagen = producto.imagen
    this.flor.alt = producto.alt
    this.flor.stock = producto.stock

    Swal.fire({
      titleText: this.flor.nombre,
      title: this.flor.precio,
      text: this.flor.descripcion,
      imageUrl: this.flor.imagen,
      imageWidth: 300,
      imageAlt: this.flor.alt,
      cancelButtonText: "cancelar"
      
    });
  }

  
  // Filtrar los productos que no pertenezcan a la categoría "ofertas"
  filtrarProductos() {
    this.coleccionFiltrada = this.coleccionProductos.filter(producto => !producto.oferta);
  }
}

 

