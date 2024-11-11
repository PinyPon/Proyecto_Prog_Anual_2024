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
  
  coleccionOfertas: Producto[] = [];

  coleccionGeneral: Producto[] = [];

  mostrarMas: boolean = false;

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    // subscribe -> método de notificación de cambios (observable)
    this.servicioCrud.obtenerProducto().subscribe(producto => {

      // Filtro para que solo las card se cierta categoria se muestren en esta pagina
      this.coleccionProductos = producto;
    })
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

  filtroProductos(){
    this.coleccionProductos.forEach(producto =>{
      if(producto.oferta === true){
        this.coleccionOfertas.push(producto);
      }else{
        this.coleccionGeneral.push(producto);
      }
    })
  }
}
 

