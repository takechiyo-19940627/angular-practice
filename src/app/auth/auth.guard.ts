import { CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    // NOTE: 便宜上trueを返している
    return true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
      return this.canActivate(route, state);
  }
  
  checkLogin(url: string): true|UrlTree {
    if (this.authService.isLoggedIn) { return true; }

    this.authService.redurectUrl = url;

    const sessionId = 123456789;

    const navigationExtras: NavigationExtras = {
      queryParams: { sessionId: sessionId },
      fragment: 'anchor',
    };

    return this.router.createUrlTree(['/login'], navigationExtras);
  }
}
