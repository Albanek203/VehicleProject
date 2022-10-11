import { Injectable } from "@angular/core";
import { API_URL } from "@config/Constants";
import { HttpClient } from "@angular/common/http";
import { LoginCredential } from "@api/models/LoginCredential";
import { Observable } from "rxjs";
import { RegistrationCredential } from "@api/models/RegistrationCredential";
import { User } from "@api/models/User";

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  private readonly URL = `${ API_URL }/auth`;

  constructor(private http: HttpClient) {
  }

  login(credential: LoginCredential): Observable<User> {
    return this.http.post<User>(`${ this.URL }/login`, credential);
  }

  logout() {
    return this.http.post(`${ this.URL }/logout`, { responseType: 'text' });
  }

  register(credential: RegistrationCredential) {
    return this.http.post(`${ this.URL }/signup`, credential)
  }

  isActiveUser(id: number) {
    return this.http.post(`${ this.URL }/active-user/${ id }`, {});
  }

  isEmailExists(email: string) {
    const headers = { 'email': email };
    return this.http.post(`${ this.URL }/exists-email`, {}, { headers });
  }
}
