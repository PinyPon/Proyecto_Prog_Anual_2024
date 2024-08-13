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
        description: "Ramo de flores",
        precio: 5,
        imagen: "../../../../../../../../../../../../../../assets/1.jpg",     
        alt: "https://i.pinimg.com/236x/76/81/a9/7681a926a2e45278194d3c55f91e0632.jpg"
       },
       {
        id: "",
        nombre: "",
        description: "Ramo de flores",
        precio: 5,
        imagen: "../../../../../../../../../../../../../../assets/1.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo de flores",
        precio: 500,
        imagen: "../../../../../../../../../../../../../../assets/1.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo de flores",
        precio: 5000,
        imagen: "../../../../../../../../../../../../../../assets/1.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo de flores",
        precio: 5000,
        imagen: "../../../../../../../../../../../../../../assets/1.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo de flores",
        precio: 5000,
        imagen: "../../../../../../../../../../../../../../assets/1.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo de flores",
        precio: 5000,
        imagen: "../../../../../../../../../../../../../assets/2.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo de flores",
        precio: 5000,
        imagen: "../../../../../../../../../../../../../../assets/3.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo de flores",
        precio: 5000,
        imagen: "../../../../../../../../../../../../../../assets/4.jpg",
        alt: ""
       },
       {
        id: "",
        nombre: "",
        description: "Ramo de flores",
        precio: 5000,
        imagen: "../../../../../../../../../../../../../../assets/5.jpg",
        alt: ""
       }
     ]
   }
}
