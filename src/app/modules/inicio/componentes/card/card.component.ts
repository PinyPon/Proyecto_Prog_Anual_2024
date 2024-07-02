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
        description: "Mixto",
        precio: 5,
        imagen: "https://i.pinimg.com/236x/e1/74/8b/e1748bcf430e9dcb622ea6fb6d0c7cde.jpg",     
        alt: "https://i.pinimg.com/236x/76/81/a9/7681a926a2e45278194d3c55f91e0632.jpg"
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5,
        imagen: "https://i.pinimg.com/236x/e1/74/8b/e1748bcf430e9dcb622ea6fb6d0c7cde.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 500,
        imagen: "https://i.pinimg.com/236x/e1/74/8b/e1748bcf430e9dcb622ea6fb6d0c7cde.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5000,
        imagen: "https://i.pinimg.com/236x/e1/74/8b/e1748bcf430e9dcb622ea6fb6d0c7cde.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5000,
        imagen: "https://i.pinimg.com/236x/e1/74/8b/e1748bcf430e9dcb622ea6fb6d0c7cde.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo",
        precio: 5000,
        imagen: "https://i.pinimg.com/236x/e1/74/8b/e1748bcf430e9dcb622ea6fb6d0c7cde.jpg",
        alt: ""
       }
     ]
   }
}
