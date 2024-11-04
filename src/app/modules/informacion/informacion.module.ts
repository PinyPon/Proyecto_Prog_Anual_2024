import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacionRoutingModule } from './informacion-routing.module';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ContactoComponent } from './contacto/contacto.component';


@NgModule({
  declarations: [
    NosotrosComponent,
    PreguntasComponent,
    ContactoComponent
  ],
  imports: [
    CommonModule,
    InformacionRoutingModule
  ],
  exports: [
    NosotrosComponent,
    PreguntasComponent,
    ContactoComponent
  ]
})
export class InformacionModule { }
