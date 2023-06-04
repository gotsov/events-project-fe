import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../models/Event";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Event[]> {
    return this.http.get('http://localhost:8080/api/events', {withCredentials: true}) as Observable<Event[]>;
  }

  getById(id: string): Observable<Event> {
    return this.http.get(`http://localhost:8080/api/events/${id}`, {withCredentials: true}) as Observable<Event>;
  }

  add(event: Event): Observable<Event> {
    const requestBody = JSON.stringify(event);

    console.log("Request In event service: " + requestBody);
    return this.http.post('http://localhost:8080/api/events', requestBody, {headers: {'Content-Type': 'application/json'}, withCredentials: true}) as Observable<Event>;
  }
}
