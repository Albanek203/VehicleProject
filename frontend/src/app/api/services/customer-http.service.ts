import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_URL } from "@config/Constants";
import { Observable } from "rxjs";
import { RestPage } from "@api/models/RestPage";
import { Pagination } from "@api/models/Pagination";
import { Customer } from "@api/models/Customer";

@Injectable({ providedIn: 'root' })
export class CustomerHttpService {
  private readonly URL = `${ API_URL }/customer`;

  constructor(private http: HttpClient) {
  }

  getAll(params: { [key: string]: any }, pagination: Pagination): Observable<RestPage<Customer>> {
    params = new HttpParams({ fromObject: { ...params, ...pagination } });
    return this.http.get<RestPage<Customer>>(`${ this.URL }`, { params });
  }

  get(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${ this.URL }/${ id }`);
  }

  create(customer: Customer) {
    return this.http.post<void>(this.URL, customer);
  }

  update(customer: Customer) {
    return this.http.put<void>(`${ this.URL }/${ customer.id }`, customer);
  }

  delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${ this.URL }/${ id }`);
  }
}
