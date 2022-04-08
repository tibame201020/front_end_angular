import { SideBarService } from './../../side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';
import { READ_SIDE_BAR_CONFIG } from '../side-bar-config';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { CodeNmModel } from 'src/app/publish/model/CodeNmModel';
import { PublishService } from 'src/app/publish/publish.service';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit {
  codeNmLs: CodeNmModel[] = [];
  form = this.formBuilder.group({
    code: [, Validators.required]
  });

  constructor(private SideBarService:SideBarService,
    private formBuilder:FormBuilder,
    private PublishService:PublishService ) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(READ_SIDE_BAR_CONFIG);
  }

  selectCodeNmLs(): void {
    if (!this.form.value.code.length) {
      return;
    }
    if (this.form.value.code.trim().length) {
      this.PublishService.getCodeNmLs(this.form.value.code.trim()).subscribe(
        res => {
          this.codeNmLs = res;
        })
    }
  }
}
