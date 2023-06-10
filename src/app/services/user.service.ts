import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInfo} from "../models/UserInfo";
import {Venue} from "../models/Venue";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get('http://localhost:8080/api/users/all', {withCredentials: true}) as Observable<UserInfo[]>;
  }

  acceptUser(userId: number, decision: string): Observable<UserInfo> {
    const params = new HttpParams().set('decision', decision);
    return this.http.get(`http://localhost:8080/api/users/accept-user/${userId}`, {params, withCredentials: true}) as Observable<UserInfo>;
  }

  demoteUser(userId: number) {
    return this.http.get(`http://localhost:8080/api/users/demote-user/${userId}`, { withCredentials: true}) as Observable<UserInfo>;
  }

  requestOrganizer() {
    return this.http.get(`http://localhost:8080/api/users/request/organizer`, { withCredentials: true}) as Observable<UserInfo>;
  }

}
