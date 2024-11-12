import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import {Router} from '@angular/router';

// Sweet alert
import Swal from 'sweetalert2'

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logueado = true;
  deslogueado = false;

  
  constructor(
    public servicioAuth : AuthService,
    public servicioRutas : Router,
  ){}

  ingresar(){
    this.logueado = false;
    this.deslogueado = true;
  }

  cerrarSesion(){
    this.logueado = true;
    this.deslogueado = false;

    
  this.servicioAuth.cerrarSesion();
  this.servicioRutas.navigate(['/']);
  }

  carrito(){
    Swal.fire({
      title: "Oops",
      text: "Este boton no está listo todavía",
      icon: "warning"
    });
  }

  closeOffcanvas() {
    const offcanvasElement = document.querySelector('.offcanvas');
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvasInstance.hide();
  }

}
