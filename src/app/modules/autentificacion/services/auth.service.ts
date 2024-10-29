
import { Injectable } from '@angular/core';

// Servicio en la nube de autentificación de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Accedemos directamente al servicio Firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Observables para obtener cambios
import { Observable } from 'rxjs';

// Itera colección leyendo información actual
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   // Propiedad privada para guardar rol de usuario
   private rolUsuario: string | null = null;

  // Referenciar Auth de Firebase en el servicio y ServicioFirestore
  constructor(
    private auth: AngularFireAuth, 
    private servicioFirestore: AngularFirestore
  ) { }

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

    // FUNCIÓN PARA OBTENER EMAIL
  obtenerUsuario(email: string){
    /**
     * Retornamos del servicioFirestore la colección de 'usuarios', buscamos una referencia en los email registrados
     * y los comparamos con los que ingrese el usuario al iniciar sesión, y lo obtiene con el '.get()'
     * Lo vuelve una promesa => da un resultado RESUELTO o RECHAZADO
     */
    return this.servicioFirestore.collection('usuarios', ref => ref.where('email', '==', email)).get().toPromise();
  }

  // FUNCIÓN PARA OBTENER EL ROL DEL USUARIO
  obtenerRol(uid: string): Observable<string | null> {
    /*
      Accedemos a colección de usuarios, buscando por UID, obteniendo cambios en valores.
      Al enviar info. por tubería, "mapeamos" la colección, obtenemos un usuario especifico 
      y buscamos su atributo "rol", aún si este es "nulo"
    */
    return this.servicioFirestore.collection("usuarios").doc(uid).valueChanges()
    .pipe(map((usuario: any) => usuario ? usuario.rol: null));
  }

  // Enviar el rol obtenido -> asignarlo al rol de la variable local
  setUsuarioRol(rol: string){
    this.rolUsuario = rol;
  }

  // Obtener el rol y retornar
  getUsuarioRol(): string | null {
    return this.rolUsuario;
  }
}
