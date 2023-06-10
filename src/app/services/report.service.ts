import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Sector} from "../models/Sector";
import {Observable} from "rxjs";
import {Report} from "../models/Report";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  fileReport(reportedUserId: number, comment: string): Observable<String> {
    const requestBody = comment;
    const params = new HttpParams().set('reportedUserId', reportedUserId.toString());

    console.log("Request fileReport: " + requestBody);
    return this.http.post('http://localhost:8080/api/reports', requestBody,
      {headers: {'Content-Type': 'application/json'}, params, withCredentials: true, responseType: 'text' as 'json'}) as Observable<String>;
  }

  getUserReports(id: number): Observable<Report[]> {
    return this.http.get(`http://localhost:8080/api/reports/user/${id}`, {withCredentials: true}) as Observable<Report[]>;
  }

}
