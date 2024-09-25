import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrouselComponent } from './modules/inicio/componentes/carrousel/carrousel.component';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';


const routes: Routes = [
  // RUTA INICIAL / PRINCIPAL AL COMPONENTE
  {
    path:"",component: InicioComponent
  },
  // Cargas perezosa
  {
    path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/producto/producto.module').then(m=>m.ProductoModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/autentificacion/autentificacion.module').then(m=>m.AutentificacionModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/informacion/informacion.module').then(m=>m.InformacionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  export={
    CarrouselComponent
  }
 }
