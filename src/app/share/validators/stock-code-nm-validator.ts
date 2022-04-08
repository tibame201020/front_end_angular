import { PublishService } from 'src/app/publish/publish.service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Injectable, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
@Injectable({ providedIn: 'root' })
export class StockCodeValidator implements AsyncValidator {
  constructor(private PublishService:PublishService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.PublishService.checkCodeNm(control.value).pipe(
      map(isTaken => (isTaken ? { isOK: true } : null)),
      catchError(() => of({ serverError: `the server error, plz contact manager` }))
    );
  }
}
