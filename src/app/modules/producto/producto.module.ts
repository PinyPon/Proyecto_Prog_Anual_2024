import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { RgrandesComponent } from './rgrandes/rgrandes.component';
import { RmedianosComponent } from './rmedianos/rmedianos.component';
import { RcasamientoComponent } from './rcasamiento/rcasamiento.component';


@NgModule({
  declarations: [
    RgrandesComponent,
    RmedianosComponent,
    RcasamientoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ]
})
export class ProductoModule { }
