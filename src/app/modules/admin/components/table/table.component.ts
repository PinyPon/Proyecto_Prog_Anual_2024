import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Sweet alert
import Swal from 'sweetalert2';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  // Creamos colección local de productos -> la definimos como array
  coleccionProductos: Producto[] = [];

  productoSeleccionado!: Producto; // ! <- tomar valores vacíos

  modalVisibleProducto: boolean = false;

  // Definimos formulario para los productos
  /**
   * Atributos alfanuméricos (string) se inicializan con comillas simples
   * Atributos numéricos (number) se inicializan con cero ('0')
   */
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  })

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    // subscribe -> método de notificación de cambios (observable)
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;

    })
  }

  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        idProducto: '',
        // el ! es para que el dato esté vacío.
        nombre: this.producto.value.nombre!,
        precio: this.producto.value.precio!,
        descripcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!
      }


      await this.servicioCrud.crearProducto(nuevoProducto)
        .then(producto => {
          Swal.fire({
            title: "¡Bien!",
            text: "¡Producto cargado exitosamente!",
            icon: "success"
          });
          // Resetea el formulario y las casillas quedan vacías
          this.producto.reset();
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No pudimos guardar tu producto",
          });
          this.producto.reset();
        })
    }
  }

  // ELIMINAR PRODUCTOS
  // función vinculada al modal y el botón de la tabla
  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProducto = true;

    this.productoSeleccionado = productoSeleccionado;
  }

  borrarProducto() {
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto)
      .then(respuesta => {
        Swal.fire({
          text: "Producto eliminado!",
          icon: "success"
        });
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No pudimos guardar tu producto",
        });      })
  }

  // EDITAR PRODUCTOS
  // Se envía y llama al momento que tocamos botón "Editar" de la tabla
  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;
    /*
      Toma los valores del producto seleccionado y los va a
      autocompletar en el formulario del modal (menos el ID)
    */
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    })
  }

  // VINCULA A BOTÓN "editarProducto" del modal de "Editar"
  editarProducto() {
    let datos: Producto = {
      // Solo idProducto no se modifica por el usuario
      idProducto: this.productoSeleccionado.idProducto,
      /* Los demás atributos reciben nueva información/ 
      valor desde el formulario */
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.producto.value.imagen!,
      alt: this.producto.value.alt!
    }

    // Enviamos al método el id del producto seleccionado y los datos actualizados
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(producto => {
        Swal.fire({
          text: "Producto editado con exito!",
          icon: "success"
        });
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No pudimos guardar tu producto",
        });
      })
  }
}