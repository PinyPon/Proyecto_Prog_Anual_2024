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

// Definimos la interfaz
productos: Producto = {
  idProducto: '',
  nombre: '',
  precio: 0,
  descripcion: '',
  oferta: '',
  categoria: '',
  imagen: '',
  alt: '',
  stock: 0,
}

  // Creamos colección local de productos -> la definimos como array
  coleccionProductos: Producto[] = [];

  productoSeleccionado!: Producto; // ! <- tomar valores vacíos

  modalVisibleProducto: boolean = false;

  nombreImagen!: string; // obtendra el nombre de la imagen

  imagen!: string;// obtendra la ruta de la imagen

  // Definimos formulario para los productos
  /**
   * Atributos alfanuméricos (string) se inicializan con comillas simples
   * Atributos numéricos (number) se inicializan con cero ('0')
   */

// Crea un nuevo formulario reactivo (FormGroup) para manejar los datos de un producto.
// Cada campo del formulario está representado por un FormControl con su valor inicial 
// y las validaciones correspondientes:
// - 'nombre', 'precio', 'descripcion', 'oferta', 'categoria', 'alt', y 'stock' son 
// campos obligatorios con la validación 'Validators.required'.
// - 'precio' y 'stock' tienen valores iniciales de 0.
// - 'imagen' está comentado, pero si se habilita sería otro campo obligatorio.
// Este formulario permitirá gestionar y validar la información del producto.

    producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    oferta: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    // imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
    stock: new FormControl(0,Validators.required)
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
        oferta: this.producto.value.oferta!,
        categoria: this.producto.value.categoria!,
        imagen: '',
        alt: this.producto.value.alt!,
        stock: this.producto.value.stock!
      }
      alert("NuevoProducto.oferta: " + nuevoProducto.oferta);
      console.log("NuevoProducto.oferta: " + nuevoProducto.oferta);
      
      
      // Enviamos nombre y url de la imagen; definimos carpeta de imágenes como "productos"
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          // encapsulamos respuesta y envíamos la información obtenida
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              // ahora método crearProducto recibe datos del formulario y URL creada
              this.servicioCrud.crearProducto(nuevoProducto, url)
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
                })
                this.limpiarInputs();
            })
        })
    }
  }

  // CARGAR IMÁGENES
  cargarImagen(event: any) {
    // Variable para obtener el archivo subido desde el input del HTML
    let archivo = event.target.files[0];

    // Variable para crear un nuevo objeto de tipo "archivo" o "file" y leerlo
    let reader = new FileReader();

    if (archivo != undefined) {
      /*
        Llamamos a método readAsDataURL para leer toda la información recibida
        Envíamos como parámetro al "archivo" porque será el encargador de tener la 
        info ingresada por el usuario
      */
      reader.readAsDataURL(archivo);

      // Definimos qué haremos con la información mediante función flecha
      reader.onloadend = () => {
        let url = reader.result;

        // Condicionamos según una URL existente y no "nula"
        if (url != null) {
          // Definimos nombre de la imagen con atributo "name" del input
          this.nombreImagen = archivo.name;

          // Definimos ruta de la imagen según la url recibida
          this.imagen = url.toString();
        }
      }
    }
  }

  // ELIMINAR PRODUCTOS
  // función vinculada al modal y el botón de la tabla
  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProducto = true;

    this.productoSeleccionado = productoSeleccionado;
  }

  borrarProducto() {
    /*
      Ahora envíamos tanto el ID del producto (para identificarlo en Firestore)
      y la URL de la imagen (para identificarlo en Storage)
      ID y URL <- identificadores propios de cada archivo en la Base de Datos
    */
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado.imagen)
      .then(respuesta => {
        Swal.fire({
          text: "Producto eliminado!",
          icon: "success"
        });
        this.limpiarInputs();
      })

      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No pudimos guardar tu producto",
        });
        
      this.limpiarInputs();
      })
  }

  // EDITAR PRODUCTOS
  // Se envía y llama al momento que tocamos botón "Editar" de la tabla
  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;
    /*
      Toma los valores del producto seleccionado y los va a
      autocompletar en el formulario del modal
      (menos el ID y la URL de la imagen)
    */
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      oferta: productoSeleccionado.oferta,
      categoria: productoSeleccionado.categoria,
      // imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt,
      stock: productoSeleccionado.stock
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
      oferta: this.producto.value.oferta!,
      categoria: this.producto.value.categoria!,
      imagen: this.productoSeleccionado.imagen,
      alt: this.producto.value.alt!,
      stock: this.producto.value.stock!
    }

    // Verificamos si el usuario ingresa o no una nueva imagen
    if (this.imagen) {
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              datos.imagen = url; // Actualizamos URL de la imagen en los datos del formulario

              this.actualizarProducto(datos); // Actualizamos los datos

              
              this.limpiarInputs();
              this.producto.reset(); // Vaciar las casillas del formulario
            })
            .catch(error => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un error al guardar la imagen",
              });

              this.producto.reset();
              
      this.limpiarInputs();
            })
        })
    } else {
      /*
        Actualizamos formulario con los datos recibidos del usuario, pero sin 
        modificar la imagen ya existente en Firestore y en Storage
      */
      this.actualizarProducto(datos);
      /*this.coleccionProductos.ngOnInit();*/ 
    }
  }

  limpiarInputs() {
    const inputs = {
      nombre: this.productos.nombre = ' ',
      precio: this.productos.precio = 0,
      descripcion: this.productos.descripcion = ' ',
      oferta: this.productos.oferta = '',
      categoria: this.productos.categoria = ' ',
      imagen: '',
      alt: this.productos.alt = ' ',
      stock: this.productos.stock = 0
    }
  }

  // ACTUALIZAR la información ya existente de los productos
  actualizarProducto(datos: Producto) {
    // Enviamos al método el id del producto seleccionado y los datos actualizados
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(producto => {
        Swal.fire({
          text: "El producto se ha modificado con éxito.",
          icon: "success"
        });
        
      this.limpiarInputs();
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema al modificar el producto: \n" + error,
        });
        
      this.limpiarInputs();
      })
  }
}