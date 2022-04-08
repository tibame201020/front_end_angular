import { catchError, map, Observable, of, tap } from 'rxjs';
import { UserService } from './../../user.service';
import { Injectable, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
@Injectable({ providedIn: 'root' })
export class UserAccountValidator implements AsyncValidator {
  validType?: string;

  constructor(private userService: UserService) {}

  set (validType:string): UserAccountValidator {
    this.validType = validType;
    return this;
  }

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    if (this.validType == "account") {
      return this.userService.validUserAccount(control.value).pipe(
        map(isTaken => (isTaken ? { unique: true } : null)),
        catchError(() => of({ serverError: `the server error, plz contact manager` }))
      );
    }
    if (this.validType == "mail") {
      return this.userService.validUserMail(control.value).pipe(
        map(isTaken => (isTaken ? { unique: true } : null)),
        catchError(() => of({ serverError: `the server error, plz contact manager` }))
      );
    }
    return this.userService.validUserPhone(control.value).pipe(
      map(isTaken => (isTaken ? { unique: true } : null)),
      catchError(() => of({ serverError: `the server error, plz contact manager` }))
    );
  }
}
