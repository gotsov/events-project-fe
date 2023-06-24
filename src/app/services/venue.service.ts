import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../models/Event";
import {Venue} from "../models/Venue";
import {BASE_URL} from "../../api.config";

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private http: HttpClient) { }

  add(venue: Venue): Observable<any> {
    const requestBody = JSON.stringify(venue);

    return this.http.post(`${BASE_URL}/venues`, requestBody, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    }) as Observable<any>;
  }

  getAllVenuesCurrentUser(): Observable<Venue[]> {
    return this.http.get(`${BASE_URL}/venues/current-user`, {withCredentials: true}) as Observable<Venue[]>;
  }

  getByName(name: string): Observable<Venue> {
    return this.http.get(`${BASE_URL}/venues/name/${name}`, {withCredentials: true}) as Observable<Venue>;
  }

  getById(id: number): Observable<Venue> {
    return this.http.get(`${BASE_URL}/venues/${id}`, {withCredentials: true}) as Observable<Venue>;
  }
}
