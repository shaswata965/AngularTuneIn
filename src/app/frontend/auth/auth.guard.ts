import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {UserService} from "../service/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this.userService.getIsAuthenticated();
        if(!isAuth){
           this.router.navigate(['/']);
        }
        return isAuth;
    }

}
