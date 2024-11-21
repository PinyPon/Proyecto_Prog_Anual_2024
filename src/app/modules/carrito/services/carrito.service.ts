import { Injectable } from '@angular/core';

//importación angular firestore
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

//import modelos
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';

//importamos paquetería de alertas personalizadas
import Swal from 'sweetalert2';

import { AuthService } from '../../autentificacion/services/auth.service';

import { Router } from '@angular/router';
import { map } from 'rxjs';

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
  oferta: '',
  categoria: '',
  imagen: '',
  alt: '',
  stock: 0
  },
  cantidad: 0,
  total: 0
}


private pedidosColeccion: AngularFirestoreCollection<Pedido>

private uid:string | null = null;
  servicioFireStore: any;

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
  //FUNCION PARA CREAR PEDIDOS
  crearPedido(producto:Producto, stock:number){
    try{
      const idPedido = this.servicioFireStore.createId();

      //actualizamos datos del pedido
      this.pedido.idPedido = idPedido;
      this.pedido.producto = producto;
      this.pedido.cantidad = stock;
      this.pedido.total = producto.precio*stock; //cálculo de precio total

      //agregamos nuevo pedido recién obtenido a la colección de pedidos
      this.pedidosColeccion.doc(idPedido).set(this.pedido);

    } catch (error) {
      Swal.fire({
        title:'¡Oh no!',
        text:'Ha ocurrido un error al intentar subir el producto \n'+error,
        icon:'error'
      })
    }
  }
    //FUNCION PARA BORRAR PEDIDO
    borrarPedido(pedido: Pedido){
      try {
        this.pedidosColeccion.doc(pedido.idPedido).delete();
  
        Swal.fire({
          title:'El producto ha sido borrado',
          text:'Se ha borrado correctamente el producto.',
          icon:'success',
        })
  
      } catch (error) {
        Swal.fire({
          title:'¡Oh no!',
          text:'Ha ocurrido un error al intentar borrar el producto. \n'+error,
          icon:'error'
        })
      }
    }
  
}





