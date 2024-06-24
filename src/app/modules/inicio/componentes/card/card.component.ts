import { Component } from '@angular/core';
// IMPORTAMOS INTERFAZ
import { Flores } from 'src/app/models/flores';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
   // PROPIEDAD PÚBLICA (TIPO: ARRAY)
   public info: Flores[];
  
   constructor(){
     this.info = [
      {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5,
        imagen: "src/assets/ramo1.jfif",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5,
        imagen: "src/assets/ramo2.jfif",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 500,
        imagen: "src/assets/ramo3.jfif",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5000,
        imagen: "src/assets/ramo4.jfif",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5000,
        imagen: "src/assets/ramo5.jfif",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5000,
        imagen: "src/assets/ramo6.jfif",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5000,
        imagen: "src/assets/ramo7.jfif",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5000,
        imagen: "src/assets/ramo8.jfif",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5000,
        imagen: "src/assets/ramo5.jfif",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5000,
        imagen: "src/assets/ramo10.jfif",
        alt: ""
       }
     ]
   }
}
