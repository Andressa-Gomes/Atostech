import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRoles: string[] = route.data['roles'] || [];

    return this.userService.checkAuth().pipe(
      map((res: any) => {
        console.log('Resposta do checkAuth:', res?.message?.toUpperCase().trim()); // debug
        return res?.message?.toUpperCase().trim();
      }),
      map((role: string | null) => {
        const isAuthenticated = !!role;
        const hasAccess = isAuthenticated && expectedRoles.includes(role);

        if (!hasAccess) {
          this.router.navigate(['/acesso-negado']);
        }

        return hasAccess;
      }),
      catchError(() => {
        localStorage.removeItem('userRole');
        this.router.navigate(['signin']);
        console.error('Erro ao verificar autenticação:', 'Usuário não autenticado ou erro na requisição');
        return of(false);
      })
    );
  }
}

