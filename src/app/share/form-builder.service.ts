
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomInputBulider } from '../model/form/customInput';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  constructor() { }

  public createInput(form: FormGroup) {
    return new CustomInputBulider(form);
  }

}
