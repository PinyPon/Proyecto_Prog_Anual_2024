import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importaciones para que los componentes de este modulo se puedan ver en el menu
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PreguntasComponent } from './preguntas/preguntas.component';

const routes: Routes = [
  {
    path:"nosotros",component: NosotrosComponent
  },
  {
    path: "preguntas", component: PreguntasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionRoutingModule { 
 
}
