import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pedido } from 'src/app/models/pedido';
import { AuthService } from '../../autentificacion/services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  pedido: Pedido= {
  idPedido: '',
  producto:{
  idProducto: '',
  nombre: '',
  precio: 0,
  descripcion: '',
  oferta: false,
  categoria: '',
  imagen: '',
  alt: '',
  stock: 0
  },
  cantidad: 0,
  total: 0
}
private pedidosColeccion: AngularFirestoreCollection<Pedido>

private uid: string | null = null;
  constructor(
    private servicioAuth: AuthService,
    private servicioFirestore: AngularFirestore,
    public servicioRutas: Router
  ) { 
    // Creamos la sub-coleccion 
    this.pedidosColeccion = this.servicioFirestore.collection(`usuario/${this.uid}/pedido`);
  }

  // Inicializa el carrito y la subcoleccion de pedidos
  iniciarCarrito(){
    this.servicioAuth.obtenerUid().then(uid => {
      this.uid = uid

      if (this.uid === null) {
        console.error('No se obtubo el UID. Intente otra cosa');

        this.servicioRutas.navigate(['/inicio-sesion']);
      } else {
        this.pedidosColeccion = this.servicioFirestore.collection(`usuarios/${this.uid}/pedido`)
      }
    })
  }
// Obtiene los productos que ya esten dentro del pedido
  obtenerCarrito(){
    return this.pedidosColeccion.snapshotChanges().pipe(map(action => 
      action.map(a => a.payload.doc.data())))
  }

  crearPedido(producto: Producto, stock: number){
    try {
      const idPedido = this.servicioFirestore.createId();

      this.pedido.idPedido = idPedido;
      this.pedido.producto = producto;
      this.pedido.cantidad = stock;
      this.pedido.total = producto.precio*stock;

      this.pedidosColeccion.doc(idPedido).set(this.pedido)
      Swal.fire({
        title: "Oh, no",
        text: 'Hubo un problema con su pedido',
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
    }
    catch{
      Swal.fire({
        title: "Tenemos un problema con eso",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }
  }

  borrarPedido(pedido: Pedido){
    try{
      this.pedidosColeccion.doc(pedido.idPedido).delete();

      Swal.fire({
        title: `${pedido.producto.nombre} ha sido borrado`,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }
    catch (error){
      Swal.fire({
        title: "Oh, no",
        text: 'Hubo un problema al borrar su pedido',
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
    }
  }
}
