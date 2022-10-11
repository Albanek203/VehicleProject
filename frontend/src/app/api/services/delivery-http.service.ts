import { Injectable } from "@angular/core";
import { API_URL } from "@config/Constants";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Delivery } from "@api/models/Delivery";
import { RestPage } from "@api/models/RestPage";
import { Pagination } from "@api/models/Pagination";

@Injectable({ providedIn: 'root' })
export class DeliveryHttpService {
  private readonly URL = `${ API_URL }/delivery`;

  constructor(private http: HttpClient) {
  }

  getAll(params: { [key: string]: any }, pagination: Pagination): Observable<RestPage<Delivery>> {
    params = new HttpParams({ fromObject: { ...params, ...pagination } });
    return this.http.get<RestPage<Delivery>>(`${ this.URL }`, { params });
  }

  get(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${ this.URL }/${ id }`);
  }

  create(delivery: Delivery) {
    return this.http.post<void>(this.URL, delivery);
  }

  update(delivery: Delivery) {
    return this.http.put<void>(`${ this.URL }/${ delivery.id }`, delivery);
  }

  delete(id: number): Observable<Delivery> {
    return this.http.delete<Delivery>(`${ this.URL }/${ id }`);
  }
}
