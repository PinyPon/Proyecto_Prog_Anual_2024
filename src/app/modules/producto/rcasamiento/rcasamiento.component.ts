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
  coleccionCasamiento: Producto[] = [];
  productoSeleccionado!: Producto;
  modalVisible: boolean = false;
  stock: number = 0;

  constructor(
    public servicioCrud: CrudService,
    public servicioCarrito: CarritoService
  ) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;
      this.mostrarProductoCasamiento();
    });
    this.servicioCarrito.iniciarCarrito();
  }

  mostrarProductoCasamiento() {
    this.coleccionProductos.forEach(producto => {
      if (producto.categoria === 'casamiento') {
        this.coleccionCasamiento.push(producto);
      }
    });
  }

  // Función para mostrar más información de los productos
  mostrarVer(info: Producto) {
    this.modalVisible = true;  // Hacer visible el modal
    this.productoSeleccionado = info;  // Asignar el producto seleccionado
  }

  // Función para cerrar el modal
  cerrarModal() {
    this.modalVisible = false;  // Ocultar el modal
  }

  agregarProducto(info: Producto) {
    const stockDeseado = Math.trunc(this.stock);
    if (stockDeseado <= 0 || stockDeseado > info.stock) {
      Swal.fire({
        title: "Error al agregar el producto",
        text: "Stock insuficiente",
        icon: "error"
      });
    } else {
      this.servicioCarrito.crearPedido(info, stockDeseado);
      Swal.fire({
        title: "¡Excelente!",
        text: "Producto añadido al carrito.",
        icon: "success"
      });
    }
  }
}
