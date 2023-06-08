import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {UserInfo} from "../models/UserInfo";
import {EventEmitter} from "protractor";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) { }

  login(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/login', formData, {withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.post('http://localhost:8080/logout', {}, { withCredentials: true, responseType: 'text' });
  }
}
