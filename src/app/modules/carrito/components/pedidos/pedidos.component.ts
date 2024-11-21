import { Component } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { CarritoService } from '../../services/carrito.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {

  coleccionPedidos: Pedido[] = [];

  constructor(
    public servicioCarrito: CarritoService,
    public servicioAuth: AuthService
  ){}

  //FUNCION PARA QUE SOLO QUIENES SE LOGEARON PUEDAN USAR EL CARRITO
  ngOnInit(){

    this.servicioAuth.obtenerUid().then(uid => {
      //si se encuentra uid continúa al siguiente condicional
      if (uid) {
       this.servicioAuth.obtenerRol(uid).subscribe(rol => {
        if (rol === "usuario") {
          this.servicioCarrito.iniciarCarrito();

          this.servicioCarrito.obtenerCarrito().subscribe(producto => {
            this.coleccionPedidos = producto;
          })
        } else{
          console.error("No se obtuvo el usuario de manera correcta.")
        }
       }) 
      }
    })
  }

  
  //FUNCION PARA ELIMINAR PEDIDO
  quitarPedido(pedido:Pedido){
    this.servicioCarrito.borrarPedido(pedido);
  }










  // coleccionPedidos: Pedido[] = [];

  // constructor(
  //   public servicioCarrito: CarritoService,
  //   public servicioAuth: AuthService

  // ){}
  // ngOnInit(){
  //   this.servicioAuth.obtenerUid().then(uid => {
  //     if (uid) {
  //       this.servicioAuth.obtenerRol(uid).subscribe(rol=> {
  //         if (rol === 'usuario') {
  //           this.servicioCarrito.iniciarCarrito();

  //           this.servicioCarrito.obtenerCarrito().subscribe(producto => 
  //             this.coleccionPedidos = producto
  //           )
  //         }else{
  //           console.error('No se obtuvo el usuario')
  //         }
  //       })
  //     }
  //   })
  // }
  // quitarPedido(pedido:Pedido){
  //   this.servicioCarrito.borrarPedido(pedido);
  // }
}
