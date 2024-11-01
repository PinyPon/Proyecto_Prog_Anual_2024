import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { RgrandesComponent } from './rgrandes/rgrandes.component';
import { RmedianosComponent } from './rmedianos/rmedianos.component';
import { RcasamientoComponent } from './rcasamiento/rcasamiento.component';
import { UnidadComponent } from './unidad/unidad.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule,  } from '@angular/forms';



@NgModule({
  declarations: [
    RgrandesComponent,
    RmedianosComponent,
    RcasamientoComponent,
    UnidadComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatCardModule,
    FormsModule
  ],
  exports: [
    MatCardModule,
    FormsModule
  ]
})
export class ProductoModule { }
