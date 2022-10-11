import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_URL } from "@config/Constants";
import { Observable } from "rxjs";
import { RestPage } from "@api/models/RestPage";
import { Pagination } from "@api/models/Pagination";
import { Offer } from "@api/models/Offer";

@Injectable({ providedIn: 'root' })
export class OfferHttpService {
  private readonly URL = `${ API_URL }/transporter`;

  constructor(private http: HttpClient) {
  }

  getAll(params: { [key: string]: any }, pagination: Pagination): Observable<RestPage<Offer>> {
    params = new HttpParams({ fromObject: { ...params, ...pagination } });
    return this.http.get<RestPage<Offer>>(`${ this.URL }`, { params });
  }

  get(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${ this.URL }/${ id }`);
  }

  create(offer: Offer) {
    return this.http.post<void>(this.URL, offer);
  }

  update(offer: Offer) {
    return this.http.put<void>(`${ this.URL }/${ offer.id }`, offer);
  }

  delete(id: number): Observable<Offer> {
    return this.http.delete<Offer>(`${ this.URL }/${ id }`);
  }
}
