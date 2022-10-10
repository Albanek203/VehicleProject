import { Injectable } from "@angular/core";
import { API_URL } from "@config/Constants";
import { HttpClient } from "@angular/common/http";
import { Credential } from "@api/models/Credential";
import { SecurityUser } from "@api/models/SecurityUser";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  private readonly URL = `${ API_URL }/auth`;

  constructor(private http: HttpClient) {
  }

  login(credential: Credential): Observable<SecurityUser> {
    return this.http.post<SecurityUser>(`${ this.URL }/login`, credential);
  }

  logout() {
    return this.http.post(`${ this.URL }/logout`, { responseType: 'text' });
  }
}
