import { Injectable } from "@angular/core";
import { API_URL } from "@config/Constants";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Delivery } from "@api/models/Delivery";
import { RestPage } from "@api/models/RestPage";

@Injectable({ providedIn: 'root' })
export class DeliveryHttpService {
  private readonly URL = `${ API_URL }/delivery`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<RestPage<Delivery>> {
    return this.http.get<RestPage<Delivery>>(`${ this.URL }`);
  }

  get(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${ this.URL }/${ id }`);
  }
}
