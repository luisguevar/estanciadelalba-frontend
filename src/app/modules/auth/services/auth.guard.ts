import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.user || !this.authService.token) {
      this.authService.logout();
      return false;
    }

    const token = this.authService.token;

    try {
      // Verificar si el token tiene las partes necesarias
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid token format");
      }

      // Decodificar la parte del payload (index 1)
      const payload = JSON.parse(atob(parts[1]));

      // Verificar si existe la propiedad "exp" en el payload
      if (!payload.exp) {
        throw new Error("Token does not have an expiration field");
      }

      // Validar la expiración
      const expiration = payload.exp;
      const currentTime = Math.floor(new Date().getTime() / 1000);

      if (currentTime > expiration) {
        this.authService.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error validating token:", error);
      this.authService.logout();
      return false;
    }
  }

}
