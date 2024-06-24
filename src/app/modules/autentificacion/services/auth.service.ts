import { Injectable } from '@angular/core';
// Servicio en la nube de autentificación de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Referenciar Auth de Firebase en el servicio
  constructor(public auth: AngularFireAuth) { }

  // FUNCIÓN PARA REGISTRO
  registrar(email: string, password: string){
    // retorna el valor que es creado con el método "createEmail..."
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // FUNCIÓN PARA INICIO DE SESIÓN
  iniciarSesion(email: string, password: string){
    // validar la información del usuario -> saber si existe en la colección
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // FUNCIÓN PARA CERRAR SESIÓN
  cerrarSesion(){
    // devuelve una promesa vacía -> quita token
    return this.auth.signOut();
  }

  // FUNCIÓN PARA TOMAR EL UID
  async obtenerUid(){
    // Nos va a generar una promesa y la constante la va a capturar
    const user = await this.auth.currentUser;

    /*
      Si el usuario no respeta la estructura de la interfaz /
      Si tuvo problemas para el registro -> ej.: mal internet
    */
    if(user == null){
      return null;
    } else {
      return user.uid;
    }
  }
}
