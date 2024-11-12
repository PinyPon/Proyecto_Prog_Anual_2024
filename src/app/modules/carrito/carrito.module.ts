import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PedidosComponent
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CarritoModule { }
