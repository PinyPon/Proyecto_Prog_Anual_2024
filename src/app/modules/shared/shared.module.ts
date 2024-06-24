import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './conponents/navbar/navbar.component';
import { FooterComponent } from './conponents/footer/footer.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
