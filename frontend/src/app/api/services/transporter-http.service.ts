import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_URL } from "@config/Constants";
import { Observable } from "rxjs";
import { RestPage } from "@api/models/RestPage";
import { Pagination } from "@api/models/Pagination";
import { Transporter } from "@api/models/Transporter";

@Injectable({ providedIn: 'root' })
export class TransporterHttpService {
  private readonly URL = `${ API_URL }/transporter`;

  constructor(private http: HttpClient) {
  }

  getAll(params: { [key: string]: any }, pagination: Pagination): Observable<RestPage<Transporter>> {
    params = new HttpParams({ fromObject: { ...params, ...pagination } });
    return this.http.get<RestPage<Transporter>>(`${ this.URL }`, { params });
  }

  get(id: number): Observable<Transporter> {
    return this.http.get<Transporter>(`${ this.URL }/${ id }`);
  }

  create(transporter: Transporter) {
    return this.http.post<void>(this.URL, transporter);
  }

  update(transporter: Transporter) {
    return this.http.put<void>(`${ this.URL }/${ transporter.id }`, transporter);
  }

  delete(id: number): Observable<Transporter> {
    return this.http.delete<Transporter>(`${ this.URL }/${ id }`);
  }
}
