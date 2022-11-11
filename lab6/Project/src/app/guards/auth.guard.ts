import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authService;

  constructor(private router: Router, a: AuthService){
    this.authService = a;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let auth = getAuth();
      const user = auth.currentUser;
      const routePath = route.routeConfig?.path;
      const isAuthenticated = user ? true : false;
      let canGo: boolean = false;
      
      switch(routePath){
        case 'home': canGo = true; break;
        case 'menu': canGo = true; break;
        case 'addDish': 
          this.authService.users.forEach( u =>{ 
            if(u.id == user?.uid && (u.isAdmin == true || u.isManager == true)){
              canGo = true;
            }
          });
        break;
        case 'cart': 
          if(isAuthenticated == true){
            canGo = true;
          }
          break;
        case 'dishDetail': 
          if(isAuthenticated == true){
            canGo = true;
          }
          break;
        case 'signIn': canGo = true; break;
        case 'signUp': 
          if(!isAuthenticated){canGo = true};
          break;
        case 'adminView': 
        this.authService.users.forEach( u =>{ 
          if(u.id == user?.uid && (u.isAdmin == true)){
            canGo = true;
          }
        });
      break;
        default: break; 
      }
    return canGo;
  }
  
}
