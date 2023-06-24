import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../models/Event";
import {SectorWithAvailableTickets} from "../models/SectorWithAvailableTickets";
import {BASE_URL} from "../../api.config";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Event[]> {
    return this.http.get(`${BASE_URL}/events`, {withCredentials: true}) as Observable<Event[]>;
  }

  getAllTags(): Observable<string[]> {
    return this.http.get<string[]>(`${BASE_URL}/events/tags/all`, { withCredentials: true });
  }

  getById(id: number): Observable<Event> {
    return this.http.get(`${BASE_URL}/events/${id}`, {withCredentials: true}) as Observable<Event>;
  }

  getCurrentUserEvents(): Observable<Event[]> {
    return this.http.get(`${BASE_URL}/events/current-user`, {withCredentials: true}) as Observable<Event[]>;
  }

  add(event: Event): Observable<Event> {
    const requestBody = JSON.stringify(event);

    console.log("Request In event service: " + requestBody);
    return this.http.post(`${BASE_URL}/events`, requestBody,
      {headers: {'Content-Type': 'application/json'}, withCredentials: true}) as Observable<Event>;
  }

  update(event: Event): Observable<Event> {
    const requestBody = JSON.stringify(event);
    return this.http.put(`${BASE_URL}/events`, requestBody,
      {headers: {'Content-Type': 'application/json'}, withCredentials: true}) as Observable<Event>;
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${BASE_URL}/events/${id}`, {withCredentials: true, responseType: 'text' as 'json'}) as Observable<string>;
  }

  getEventSectors(id: number): Observable<SectorWithAvailableTickets[]> {
    return this.http.get(`${BASE_URL}/events/sectors/event/${id}`, {withCredentials: true}) as Observable<SectorWithAvailableTickets[]>;
  }
}
