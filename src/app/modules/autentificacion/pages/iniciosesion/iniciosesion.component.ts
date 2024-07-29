import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide = true;


  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

  // Definimos la interfaz de usuario
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: '',
    permisos: false
  }

  // Función para iniciar sesión
  async iniciarSesion() {

    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    try {
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);

      //Condicional verificada que ese usuario de la BD existiera o que sea igual al de de nuestra colección 
      if ( !usuarioBD || usuarioBD.empty ) {
        alert("Correo electronico no registrado");
        this.limpiarInputs();
        return;
      }


      //Vincula el primer documento de la colección "usuarios" que se obtenia de la BD
      const usuarioDoc = usuarioBD.docs[0];

      //Extrae los datos del documento en forma de "objeto" y se especifica que va ser tipo "Usuario" referente a la interfaz
      const usuarioData = usuarioDoc.data() as Usuario;

      ////Encripta la contraseña
      const hasherPassword = CryptoJS.SHA256(credenciales.password).toString();

      /*
      Condicional que compara la contaseña encriptada con la enviada por el usuario
      */ 
      if (hasherPassword !== usuarioData.password) {
        alert("Contraseña incorrecta");
  
        this.usuarios.password = "";
        return;
      }

      const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
      .then(res => {
        alert('¡Se pudo ingresar con éxito :)!');

        this.servicioRutas.navigate(['/inicio']);
      })
      .catch(err => {
        alert('Hubo un problema al iniciar sesión :( ' + err);

        this.limpiarInputs();
      })
    }catch (error){
      error;
    }
  }


  limpiarInputs(){
    const inputs = {
      email: this.usuarios.email = '',
      password: this.usuarios.password = ''
    }
  }
}