import { CanActivateFn } from '@angular/router';

// Inject -> inyección de servicios
import { inject } from '@angular/core';

import { AuthService } from '../modules/autentificacion/services/auth.service';

import { Router } from '@angular/router';

// Operadores tipo "observables"
import { map, switchMap, of, from } from 'rxjs';


export const rutaProtegidaGuard: CanActivateFn = (route, state) => {
  
  // Inyectamos/ instanciamos servicio de Autentificación en el guardián (forma local)
  const servicioAuth = inject (AuthService);

  // Inyectamos/ instanciamos servicio de rutas de forma local
  const servicioRutas = inject (Router);

  // Especificamos cuál es el rol que va a esperar el guardián para activarse
  const rolEsperado = "admin";

  // FROM -> convierte una promesa en observable
  return from(servicioAuth.obtenerUid()).pipe(
    switchMap(uid => {
      // Si el UID existe, lo envía por parámetro y busca rol de usuario
      if (uid) {
        return servicioAuth.obtenerRol(uid).pipe(
          map (rol => {
            if (rol === rolEsperado){
              // Si coincide el rol esperado, damos acceso al usuario
              console.log("Usuario verificado como administrador.")

              return true;
            } else {
              // Denegamos acceso al usuario
              return false;
            }
          })
        )
      } else {
        console.log("Usuario no validado. Permisos insuficientes.");

        // Redireccionamos acceso a inicio para usuarios no validados
        // Usuario sin permiso: Visitante o NO registrado
        return of(servicioRutas.createUrlTree(['/inicio']));
      }
    })
  )
};
