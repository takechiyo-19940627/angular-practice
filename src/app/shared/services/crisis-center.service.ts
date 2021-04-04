import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Crisis } from '../models/crisis';
import { CRISES } from '../models/mock-crises';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CrisisCenterService {
  constructor(
    private messageService: MessageService,
  ) {}

  getCrises(): Observable<Crisis[]> {
    this.log('CrisisService:fetched crisis');
    return of(CRISES);
  }

  getCrisis(id: number): Observable<Crisis> {
    this.log(`CrisisCenterService: fetched crisis id=${id}`);
    const crisis = CRISES.find(crisis => crisis.id === id);
    return of(crisis);
  }

  private log(message: string):void {
    this.messageService.add(`CrisisService:${message}`);
  }
}
