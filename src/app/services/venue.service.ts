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

  getAllVenuesCurrentUser(): Observable<Venue[]> {
    return this.http.get('http://localhost:8080/api/venues/current-user', {withCredentials: true}) as Observable<Venue[]>;
  }
}
