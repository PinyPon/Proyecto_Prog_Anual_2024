import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacionRoutingModule } from './informacion-routing.module';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PreguntasComponent } from './preguntas/preguntas.component';


@NgModule({
  declarations: [
    NosotrosComponent,
    PreguntasComponent
  ],
  imports: [
    CommonModule,
    InformacionRoutingModule
  ],
  exports: [
    NosotrosComponent,
    PreguntasComponent
  ]
})
export class InformacionModule { }
