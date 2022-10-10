import { Injectable } from "@angular/core";
import { SecurityUser } from "@api/models/SecurityUser";
import { Role } from "@api/models/enum/Role";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class SecurityService {
  private readonly USER_KEY = 'user';

  private _isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated$.asObservable();

  constructor(private router: Router) {
    this._isAuthenticated$.next(this.isAuthenticated());
  }

  login(user: SecurityUser) {
    this.updateUserInLocalStorage(user);
    this._isAuthenticated$.next(true);
    this.router.navigate([this.hasRole(Role.ADMIN) ? '/admin' : '/']);
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
    this._isAuthenticated$.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.USER_KEY) != null;
  }

  getUser(): SecurityUser {
    const stringUser: string | null = localStorage.getItem(this.USER_KEY);
    return stringUser ? JSON.parse(stringUser) : null;
  }

  hasRole(role: Role) {
    return this.getUser()?.role === role;
  }

  hasAnyRole(roles: Role[]) {
    return roles.includes(this.getUser().role);
  }

  private updateUserInLocalStorage(user: SecurityUser) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

