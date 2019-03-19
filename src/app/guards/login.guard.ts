import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';


@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private sUser: UserService, private  roter: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.sUser.user) {
            console.log('no null');
            if (this.sUser.user.ok === false) {
                console.log('inicie sesion');
                this.roter.navigate(['/login']);
                return false;
            } else {
                return this.sUser.user.ok;
            }
        } else {
            console.log('null');
            this.roter.navigate(['/login']);
        }


    }
}
