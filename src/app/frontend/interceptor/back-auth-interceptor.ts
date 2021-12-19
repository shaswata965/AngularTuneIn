import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AdminService} from "../service/admin.service";

@Injectable()
export class BackAuthInterceptor implements HttpInterceptor{

  constructor(private adminService: AdminService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.adminService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', "Bearer" + authToken)
    });
    return next.handle(authRequest);
  }
}
