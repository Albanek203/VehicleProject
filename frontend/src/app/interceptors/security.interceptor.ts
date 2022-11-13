import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { SecurityService } from "@services/security.service";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private securityService: SecurityService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap({
      error: error => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === 401) {
            this.securityService.logout();
          } else if(error.status === 403) {
            this.router.navigate(['error/403'])
          } else if(error.status === 404) {
            this.router.navigate(['error/404'])
          }
        }
      }
    }));
  }
}
