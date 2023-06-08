import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../models/UserInfo";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loggedUser: UserInfo = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  };

  private userChangedSubject: Subject<any> = new Subject<any>();
  userChanged$: Observable<any> = this.userChangedSubject.asObservable();

  setUser() {
    console.log("in setUser")
    this.getCurrentLoggedUser().subscribe({
      next: response => {
        this.loggedUser = response;
        this.userChangedSubject.next(this.loggedUser);
      }
    });
  }

  getUserRole(): Observable<string> {
    return this.http.get<string>(`http://localhost:8080/api/users/role`, {withCredentials: true, responseType: 'text' as 'json'}) as Observable<string>;
  }

  getCurrentLoggedUser(): Observable<UserInfo> {
    return this.http.get('http://localhost:8080/api/users/current', {withCredentials: true}) as Observable<UserInfo>;
  }

  isUserEventOrganizer(eventId: number): Observable<boolean> {
    return this.http.get(`http://localhost:8080/api/users/event/${eventId}`, {withCredentials: true}) as Observable<boolean>;
  }
}
