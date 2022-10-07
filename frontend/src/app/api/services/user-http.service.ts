import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "@api/models/User";
import { API_URL } from "@config/Constants";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserHttpService {
  private readonly URL = `${API_URL}/users`;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}`);
  }

  public get(id: number): Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`);
  }

  public delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.URL}/${id}`);
  }
}
