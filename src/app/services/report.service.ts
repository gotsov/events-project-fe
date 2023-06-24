import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Report} from "../models/Report";
import { BASE_URL } from "../../api.config";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  fileReport(reportedUserId: number, comment: string): Observable<String> {
    const requestBody = comment;
    const params = new HttpParams().set('reportedUserId', reportedUserId.toString());

    console.log("Request fileReport: " + requestBody);
    return this.http.post(`${BASE_URL}/reports`, requestBody,
      {headers: {'Content-Type': 'application/json'}, params, withCredentials: true, responseType: 'text' as 'json'}) as Observable<String>;
  }

  getUserReports(id: number): Observable<Report[]> {
    return this.http.get(`${BASE_URL}/reports/user/${id}`, {withCredentials: true}) as Observable<Report[]>;
  }

}
