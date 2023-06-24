import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Sector} from "../models/Sector";
import {Observable} from "rxjs";
import {Ticket} from "../models/Ticket";
import {TicketFullInfo} from "../models/TicketFullInfo";
import {BASE_URL} from "../../api.config";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  generate(sectors: Sector[], eventId: number): Observable<string> {
    const requestBody = JSON.stringify(sectors);
    const params = new HttpParams().set('eventId', eventId.toString());

    console.log("Request In sector service: " + requestBody);
    return this.http.post(`${BASE_URL}/tickets/generate/event`, requestBody,
      {
        headers: {'Content-Type': 'application/json'},
        params,
        withCredentials: true,
        responseType: 'text' as 'json'
      }) as Observable<string>;
  }

  generateFree(eventId: number, numberOfTickets: number): Observable<string> {
    let params = new HttpParams().set('eventId', eventId.toString());
    params = params.append('numberOfTickets', numberOfTickets.toString());

    return this.http.post(`${BASE_URL}/tickets/generate/event/free`, null, {
      headers: { 'Content-Type': 'application/json' },
      params: params,
      withCredentials: true,
      responseType: 'text' as 'json'
    }) as Observable<string>;
  }


  buy(eventId: number, sectorId: number, numberOfTickets: number): Observable<string> {
    let params = new HttpParams().set('eventId', eventId.toString());
    params = params.append('sectorId', sectorId.toString());
    params = params.append('numberOfTickets', numberOfTickets.toString());

    return this.http.post(`${BASE_URL}/tickets/buy`, null,{
      headers: {'Content-Type': 'application/json'},
      params: params,
      withCredentials: true,
      responseType: 'text' as 'json'
    }) as Observable<string>;
  }

  getCurrentUserTickets(): Observable<TicketFullInfo[]> {
    return this.http.get(`${BASE_URL}/tickets/my-tickets`, {withCredentials: true}) as Observable<TicketFullInfo[]>;
  }

  generateTicketQRCode(ticketId: string): Observable<Blob> {
    return this.http.get(`${BASE_URL}/tickets/${ticketId}/qrcode`,
      { withCredentials: true,
        headers: {'Content-Type': 'application/json' },
        responseType: 'blob' as 'json'
      }) as Observable<Blob>;
  }
}
