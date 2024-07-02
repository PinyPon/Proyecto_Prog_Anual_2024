import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';

// VISTAS - PÁGINAS
import { InicioComponent } from './pages/inicio/inicio.component';

//Componentes
import { CardComponent } from './componentes/card/card.component';
import { CarrouselComponent } from './componentes/carrousel/carrousel.component';
//import { FooterComponent } from '../shared/conponents/footer/footer.component';

// COMPONENTES DE MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    InicioComponent,
    CardComponent,
    CarrouselComponent,
  // FooterComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class InicioModule { }
