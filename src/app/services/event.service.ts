import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";
import {UserInfo} from "../models/UserInfo";
import {Event} from "../models/Event";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Event[]> {
    return this.http.get('http://localhost:8080/api/events', {withCredentials: true}) as Observable<Event[]>;
  }
}
