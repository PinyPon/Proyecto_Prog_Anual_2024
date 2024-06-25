import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
// importamos servicio de autentificación
import { AuthService } from '../../services/auth.service';
// importamos servicio de firestore
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
// importamos componente de rutas de angular
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  //ojo de la contrasela
  hide = true;

  //Inicializamos la interfaz
  usuarios: Usuario = {
    uid: '', 
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: '',
    permisos: false
  }

  // CREAMOS COLECCIÓN DE USUARIOS, TIPO 'USUARIO' PARA ARRAYS
  coleccionUsuarios: Usuario[] = [];

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ){}

  //REGISTRO DE NUEVOS USUARIOS
  async registrar(){

    // REGISTRO CON SERVICIO DE AUTH
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }
    
    const res = await this.servicioAuth.registrar(credenciales.email, credenciales.password)
    .then(res => {
      alert("¡Se pudo registrar con éxito! :)");

      // el método NAVIGATE nos redirecciona a otra vista
      
      this.servicioRutas.navigate(['/inicio-sesion'])
    })
    //captura la falla y la convierte en un error
    .catch(error => {
      alert("Hubo un error al registrar un nuevo usuario :( \n"+error);
    })

    //Constante UID captura el identificado de la BD
    const uid = await this.servicioAuth.obtenerUid();

    //Se le asigna al atributo de la interfaz esta constante
    this.usuarios.uid = uid;

    // Llamamos a la función
    this.guardarUsuario();

    // Llamamos a la función limpiarInputs
    this.limpiarInputs();
  }

  async guardarUsuario(){
    this.servicioFirestore.agregarUsuario(this.usuarios, this.usuarios.uid)
    .then(res => {
      console.log(this.usuarios);
    })
    .catch(err => {
      console.log('Error => ', err);
    })
  }

  // Función para vaciar los inputs del formulario
  limpiarInputs(){
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = '',
      permisos: this.usuarios.permisos= false
    }
  }
}
