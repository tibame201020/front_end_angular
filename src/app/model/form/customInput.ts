import { AsyncValidator, AsyncValidatorFn, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export interface CustomInput {
  form: FormGroup;
  fieldName: string;
  type: string;
  value: string;
  palceholder: string;
  validArray: ValidatorFn[];
  customValidArray: AsyncValidatorFn[];
  errMsg: {
    required: string;
    min: string;
    max: string;
    regex: string;
    custom: string;
  };
}


export class CustomInputBulider implements CustomInput {
  constructor(form: FormGroup) {
    this.form = form;
    this.validArray.push(Validators.required)
  }
  validArray: ValidatorFn[] = [];
  customValidArray: AsyncValidatorFn[] = [];
  form: FormGroup = new FormGroup({});
  fieldName: string = '';
  type: string = 'text';
  value: string = '';
  palceholder: string = '';
  errMsg: { required: string; min: string; max: string; regex: string; custom: string; }
    = {
      required: '',
      min: '',
      max: '',
      regex: '',
      custom: ''
    };
  addValidator(validator: any): CustomInputBulider {
    this.validArray.push(validator);
    return this;
  }
  addCustomValidator(validator: any): CustomInputBulider {
    this.customValidArray.push(validator);
    return this;
  }
  setCustomValidArray(customValidArray: AsyncValidatorFn[]): CustomInputBulider {
    this.customValidArray = customValidArray;
    return this;
  }

  setFieldName(fieldName: string): CustomInputBulider {
    this.fieldName = fieldName;
    return this;
  }
  setType(type: string): CustomInputBulider {
    this.type = type;
    return this;
  }
  setValue(value: string): CustomInputBulider {
    this.value = value;
    return this;
  }
  setPlaceholder(palceholder: string): CustomInputBulider {
    this.palceholder = palceholder;
    return this;
  }
  setRequireErrMsg(msg: string): CustomInputBulider {
    this.errMsg.required = msg;
    return this;
  }
  setRegexErrMsg(msg: string): CustomInputBulider {
    this.errMsg.regex = msg;
    return this;
  }
  setCustomErrMsg(msg: string): CustomInputBulider {
    this.errMsg.custom = msg;
    return this;
  }
  bulid(): CustomInput {
    return this;
  }

}
