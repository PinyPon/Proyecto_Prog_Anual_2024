export interface Usuario {
    uid: string | any;//any es indefinido o lo que sea
    nombre: string;
    apellido: string;
    email: string;
    rol: string;//sujeto a revision.
    password: string;
    permisos: boolean; //si no sirve, sacar.
}