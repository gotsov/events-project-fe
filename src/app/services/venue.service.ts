import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../models/Event";
import {Venue} from "../models/Venue";

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private http: HttpClient) { }

  add(venue: Venue): Observable<any> {
    const requestBody = JSON.stringify(venue);

    console.log("Request In venue service: " + requestBody);
    return this.http.post('http://localhost:8080/api/venues', requestBody, {headers: {'Content-Type': 'application/json'}, withCredentials: true}) as Observable<any>;
  }

  getAllVenuesCurrentUser(): Observable<Venue[]> {
    return this.http.get('http://localhost:8080/api/venues/current-user', {withCredentials: true}) as Observable<Venue[]>;
  }

  getByName(name: string): Observable<Venue> {
    return this.http.get(`http://localhost:8080/api/venues/name/${name}`, {withCredentials: true}) as Observable<Venue>;
  }

  getById(id: number): Observable<Venue> {
    return this.http.get(`http://localhost:8080/api/venues/${id}`, {withCredentials: true}) as Observable<Venue>;
  }
}
