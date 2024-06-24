import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CardComponent } from './componentes/card/card.component';
import { CarrouselComponent } from './componentes/carrousel/carrousel.component';


@NgModule({
  declarations: [
    InicioComponent,
    CardComponent,
    CarrouselComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
