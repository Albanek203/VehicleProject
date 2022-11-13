import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SecurityService } from "../services/security.service";
import { Role } from "@api/models/enum/Role";

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
  constructor(private securityService: SecurityService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.securityService.hasRole(Role.ADMIN) ? true : this.router.createUrlTree(['/']);
  }
}
