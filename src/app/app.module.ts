import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Importamos los componentes que se utilizran en toda la pagina, y se llaman "componentes globales"
import { SharedModule } from './modules/shared/shared.module';

// FIREBASE -> importamos las herramientas de la BD
import { environment } from 'src/environments/environment'; // vincula a la BD con la APP
import { AngularFireModule } from '@angular/fire/compat'; // trabaja con las colecciones de información
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // trabaja con la autentificación
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; // trabaja con imágenes y archivos

/*
 * npm install firebase --force <-instalación a la fuerza
 * npm install @angular/fire --save --force <- Lo mismo
 */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Componentes globales
    SharedModule,
    // Vinculación a la BD
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializmos Firebase dentro del proyecto
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
