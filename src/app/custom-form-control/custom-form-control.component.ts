import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomInput } from '../model/form/customInput';
import { UserAccountValidator } from '../share/validators/user-account-validator';

@Component({
  selector: 'app-custom-form-control',
  templateUrl: './custom-form-control.component.html',
  styleUrls: ['./custom-form-control.component.css']
})
export class CustomFormControlComponent implements OnInit {

  @Input() CustomInput!: CustomInput;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.CustomInput.form.addControl(this.CustomInput.fieldName, this.formBuilder.control('', this.CustomInput.validArray,this.CustomInput.customValidArray));
  }

}
