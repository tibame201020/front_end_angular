import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css']
})
export class CkeditorComponent implements OnInit {
  @Input() form!: FormGroup;
  public Editor = ClassicEditor;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form.addControl('ckContent', this.formBuilder.control(''));
    console.log(this.form.value);
  }
}
