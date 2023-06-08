import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Sector} from "../models/Sector";
import {Observable} from "rxjs";
import {Ticket} from "../models/Ticket";
import {TicketFullInfo} from "../models/TicketFullInfo";
import {Venue} from "../models/Venue";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  generate(sectors: Sector[], eventId: number): Observable<Ticket[]> {
    const requestBody = JSON.stringify(sectors);
    const params = new HttpParams().set('eventId', eventId.toString());

    console.log("Request In sector service: " + requestBody);
    return this.http.post(`http://localhost:8080/api/tickets/generate/event`, requestBody,
      {headers: {'Content-Type': 'application/json'}, params, withCredentials: true }) as Observable<Ticket[]>;
  }

  generateFree(eventId: number, numberOfTickets: number): Observable<Ticket[]> {
    let params = new HttpParams().set('eventId', eventId.toString());
    params = params.append('numberOfTickets', numberOfTickets.toString());

    return this.http.post(`http://localhost:8080/api/tickets/generate/event/free`, null, {
      headers: { 'Content-Type': 'application/json' },
      params: params,
      withCredentials: true
    }) as Observable<Ticket[]>;
  }


  buy(eventId: number, sectorId: number, numberOfTickets: number): Observable<Ticket[]> {
    let params = new HttpParams().set('eventId', eventId.toString());
    params = params.append('sectorId', sectorId.toString());
    params = params.append('numberOfTickets', numberOfTickets.toString());

    return this.http.post(`http://localhost:8080/api/tickets/buy`, null,{
      headers: {'Content-Type': 'application/json'},
      params: params,
      withCredentials: true
    }) as Observable<Ticket[]>;
  }

  getCurrentUserTickets(): Observable<TicketFullInfo[]> {
    return this.http.get(`http://localhost:8080/api/tickets/my-tickets`, {withCredentials: true}) as Observable<TicketFullInfo[]>;
  }

  generateTicketQRCode(ticketId: string): Observable<Blob> {
    return this.http.get(`http://localhost:8080/api/tickets/${ticketId}/qrcode`,
      { withCredentials: true,
        headers: {'Content-Type': 'application/json' },
        responseType: 'blob' as 'json'
      }) as Observable<Blob>;
  }
}