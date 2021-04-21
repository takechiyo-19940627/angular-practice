import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Crisis } from '../shared/models/crisis';
import { CrisisCenterService } from '../shared/services/crisis-center.service';

@Injectable({
  providedIn: 'root'
})
export class CrisisDetailResolverService {
  constructor(private cs: CrisisCenterService, private router: Router) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Crisis> | Observable<never> {
    const id = route.paramMap.get('id');

    return this.cs.getCrisis(Number(id)).pipe(
      take(1),
      mergeMap(crisis => {
        if (crisis) {
          return of(crisis);
        } else {
          this.router.navigate(['/crisis-center']);
          return EMPTY;
        }
      }),
    )
  }
}
