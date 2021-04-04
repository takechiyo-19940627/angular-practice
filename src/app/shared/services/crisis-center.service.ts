import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Crisis } from '../models/crisis';
import { CRISES } from '../models/mock-crises';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CrisisCenterService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getCrises(): Observable<Crisis[]> {
    this.messageService.add('CrisisService:fetched crisis');
    return of(CRISES);
  }

  private log(message: string):void {
    this.messageService.add(`CrisisService:${message}`);
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
