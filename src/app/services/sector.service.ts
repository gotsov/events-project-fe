import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sector} from "../models/Sector";
import {BASE_URL} from "../../api.config";

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) { }

  add(sector: Sector, venueId: number): Observable<Sector> {
    const requestBody = JSON.stringify(sector);
    const params = new HttpParams().set('venueId', venueId.toString());

    console.log("Request In sector service: " + requestBody);
    return this.http.post(`${BASE_URL}/sectors`, requestBody,
      {headers: {'Content-Type': 'application/json'}, params, withCredentials: true, responseType: 'text' as 'json'}) as Observable<Sector>;
  }
}
