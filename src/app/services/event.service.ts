import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../models/Event";
import {Tag} from "../models/Tag";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Event[]> {
    return this.http.get('http://localhost:8080/api/events', {withCredentials: true}) as Observable<Event[]>;
  }

  getAllTags(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/events/tags/all', { withCredentials: true });
  }

  getById(id: number): Observable<Event> {
    return this.http.get(`http://localhost:8080/api/events/${id}`, {withCredentials: true}) as Observable<Event>;
  }

  getCurrentUserEvents(): Observable<Event[]> {
    return this.http.get(`http://localhost:8080/api/events/current-user`, {withCredentials: true}) as Observable<Event[]>;
  }

  add(event: Event): Observable<Event> {
    const requestBody = JSON.stringify(event);

    console.log("Request In event service: " + requestBody);
    return this.http.post('http://localhost:8080/api/events', requestBody,
      {headers: {'Content-Type': 'application/json'}, withCredentials: true}) as Observable<Event>;
  }

  update(event: Event): Observable<Event> {
    const requestBody = JSON.stringify(event);
    return this.http.put('http://localhost:8080/api/events', requestBody,
      {headers: {'Content-Type': 'application/json'}, withCredentials: true}) as Observable<Event>;
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`http://localhost:8080/api/events/${id}`, {withCredentials: true, responseType: 'text' as 'json'}) as Observable<string>;
  }
}
