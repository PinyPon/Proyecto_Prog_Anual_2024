import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
// Importaciones para manejo de archivos y referencias
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';
/*
  getDownloadURL -> Para obtener la URL de descarga de una imagen subida
  getStorage -> Para obtener la instancia de almacenamiento
  ref -> Para crear referencias a ubicaciones en el almacenamiento
  UploadResult -> Tipo que representa el resultado de una operación subida
  uploadString -> Para subir imágenes en formato de cadena
  deleteObject -> Para eliminar un espacio en el almacenamiento
*/

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Definimos colección para los productos de la web
  private productosCollection: AngularFirestoreCollection<Producto>

  // Definir variable "respuesta" que podrá subir resultados
  private respuesta!: UploadResult;

  // Inicializar servicio de Storage
  private storage = getStorage();

  // El constructor recibe una instancia de AngularFirestore, que es el servicio para interactuar con Firebase Firestore.
  // Luego, se inicializa la variable 'productosCollection' con la referencia a la colección 'producto' de Firestore,
  // lo que permite acceder a los documentos de dicha colección.
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // establece una conexión con la base de datos de Firestore, específicamente con la 
  // colección llamada "producto", y almacena esa referencia en la variable productosCollection
  // para poder interactuar con los datos de esa colección.
  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('producto');
  }

  // CREAR productos -> obtiene datos del formulario y url de la imagen
  crearProducto(producto: Producto, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        // Creamos número identificativo para el producto en la base de datos
        const idProducto = this.database.createId();

        // Asignamos ID creado al atributo idProducto de la interfaz Producto
        producto.idProducto = idProducto;

        // Asignamos URL recibida del parámetro al atributo "imagen" de interfaz Producto
        producto.imagen = url;

        const resultado = await this.productosCollection.doc(idProducto).set(producto);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
  }

  // OBTENER productos
  obtenerProducto() {
    /*
      snapshotChanges => toma captura del estado de los datos
      pipe => tuberías que retornan un nuevo arreglo
      map => "mapea" o recorre esa nueva información
      a => resguarda la nueva información y la envía como un documento 
    */

    // this.productosCollection: Es la referencia a la colección de productos en
    // Firestore. En el código anterior, ya se había creado una variable productosCollection 
    // que apunta a la colección llamada "producto" en Firebase Firestore. Así que, cuando 
    // usamos this.productosCollection, estamos hablando de esa colección.

    // snapshotChanges(): Es un método de Firestore que "escucha" cualquier cambio 
    // en la colección. Cada vez que se añade, edita o elimina un producto, el método 
    // se activará y nos devolverá un "snapshot" (una especie de captura instantánea)
    // de esos cambios. Esto quiere decir que estamos diciendo a Firestore: 
    //"Avísame cuando haya un cambio en esta colección para que lo pueda ver".

    // pipe(): Es un operador que se usa en programación reactiva (con RxJS). Con pipe()
    // podemos aplicar una serie de transformaciones a los datos que estamos recibiendo.
    // Es como un "túnel" por donde pasan los datos, y podemos agregarle pasos (transformaciones)
    // dentro de ese túnel para hacer lo que queramos antes de devolver el resultado final.

    // map(): Este es otro operador de RxJS. Lo que hace es transformar cada dato que pasa a través
    // de él. En este caso, el primer map() toma los datos de los cambios que vienen de la colección
    // (llamados "actions" o acciones) y los transforma de una manera específica.

    /*action: Cada "action" es un cambio que ocurrió en la colección.
     Puede ser una adición, una modificación o una eliminación de un producto.
     Esta acción contiene mucha información sobre lo que ocurrió, pero nosotros
     solo necesitamos los datos del producto. */

     /*
     action.map(): Aquí estamos diciendo que, para cada "action" (cambio), vamos a realizar
      otro map() para obtener los datos específicos del producto de esa acción. Esto nos permitirá
      extraer solo los datos que necesitamos de cada cambio, sin la información adicional que no nos interesa.
      */

      /*
      a.payload.doc.data(): Cada "action" tiene una propiedad llamada payload, 
      que contiene un documento de Firestore. El doc es ese documento y data() 
      es un método que extrae los datos del documento (es decir, los detalles del producto) 
      de Firestore.
      */


      /*
       En resumen, todo esto significa que estamos escuchando los cambios
       en la colección de productos y, cuando ocurre un cambio, estamos 
       extrayendo solo los datos de esos productos (sin meternos en detalles 
       de los cambios en sí). Al final, lo que obtenemos es una lista de 
       los datos de los productos actuales, que se actualiza automáticamente 
       cada vez que algo cambia.
      */
    return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  // EDITAR productos
  modificarProducto(idProducto: string, nuevaData: Producto) {
    /*
      Accedemos a la colección "productos" de la Base de Datos, buscamos el ID del 
      producto seleccionado y lo actualizamos con el método "update", enviando la 
      nueva información
    */
    //  return this.database.collection('producto').doc(idProducto).update(nuevaData);
    const resultado = this.database.collection('producto').doc(idProducto).update(nuevaData);
    return resultado;

    //return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))

  }

  // ELIMINAR productos
  eliminarProducto(idProducto: string, imagenUrl: string) {
    return new Promise((resolve, reject) => {
      try {
        // Definimos referencias localmente de Storage
        const storage = getStorage();
        // Obtiene la referencia desde el almacenamiento de Storage
        const referenciaImagen = ref(storage, imagenUrl);

        // Eliminamos la imagen desde el almacenamiento
        deleteObject(referenciaImagen)
          .then((res) => {
            const respuesta = this.productosCollection.doc(idProducto).delete();

            resolve(respuesta);
          })
          .catch(error => {
            reject("Error al eliminar la imagen: \n" + error);
          })
      }
      catch (error) {
        reject(error);
      }
    })
  }

  // OBTENER url de imágenes
  obtenerUrlImagen(respuesta: UploadResult) {
    // Retorna URL obtenida como REFERENCIA
    return getDownloadURL(respuesta.ref);
  }

  /**
   * PARÁMETROS DEFINIDOS
   * @param {string} nombre <- nombre de la imagen
   * @param {any} imagen <- tipo de imágenes que se pueden subir (extension)
   * @param {string} ruta <- ruta de almacenamiento de las imágenes
   * @returns <- se retorna lo obtenido
   */

  // SUBIR imágenes con sus referencias
  async subirImagen(nombre: string, imagen: any, ruta: string) {
    try {
      // Crear una referencia de imagen:
      // accede a Storage (almacenamiento), ruta (carpeta) / nombre (nombreImagen)
      let referenciaImagen = ref(this.storage, ruta + '/' + nombre);

      // Asignarle a la respuesta la información de las imágenes subidas
      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')
        .then(resp => {
          return resp;
        })

      return this.respuesta;
    }
    catch (error) {
      console.log(error);

      return this.respuesta;
    }
  }
}