import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Importaciones para que el "menú" nos mande a las paginas correspondientes

import { RmedianosComponent } from '../producto/rmedianos/rmedianos.component';
import { RgrandesComponent} from '../producto/rgrandes/rgrandes.component'



const routes: Routes = [
  {
    path: "medianos", component: RmedianosComponent
  },
  {
    path: "grandes", component: RgrandesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule {


 }

