import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AdminService} from "../service/admin.service";

@Injectable()
export class BackAuthGuard implements CanActivate {

  constructor( private adminService: AdminService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.adminService.getIsAuthenticated();
    if(!isAuth){
      this.router.navigate(['/backend-login']);
    }
    return isAuth;
  }

}
