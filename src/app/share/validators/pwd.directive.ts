import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const pwdValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pwd = control.get('pwd');
  const pwd2nd = control.get('pwd2nd');

  return pwd && pwd2nd && pwd.value === pwd2nd.value ? null : { pwdDifferent: `those two password must be same` };
};
