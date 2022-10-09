import { Injectable } from "@angular/core";
import { API_URL } from "@config/Constants";
import { HttpClient } from "@angular/common/http";
import { Credential } from "@api/models/Credential";

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  private readonly URL = `${ API_URL }/auth`;

  constructor(private http: HttpClient) {
  }

  login(credential: Credential) {
    return this.http.post<any>(`${ this.URL }/login`, credential);
  }

  logout() {
    return this.http.post<any>(`${ this.URL }/logout`, { responseType: 'text' });
  }
}
