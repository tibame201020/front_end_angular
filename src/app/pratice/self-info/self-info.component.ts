import { PraticeModeService } from './../pratice-mode.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CodeNmModel } from 'src/app/publish/model/CodeNmModel';
import { PublishService } from 'src/app/publish/publish.service';

@Component({
  selector: 'app-self-info',
  templateUrl: './self-info.component.html',
  styleUrls: ['./self-info.component.css']
})
export class SelfInfoComponent implements OnInit {

  codeNmLs: CodeNmModel[] = [];
  form = this.formBuilder.group({
    code: [, Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private PublishService: PublishService,
    public PraticeModeService: PraticeModeService) { }

  ngOnInit(): void {
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

  getAssestTotal() {
    const assest = this.PraticeModeService.getAssest();
    const remainCash = assest.remainCash;
    const records = this.PraticeModeService.getRecord();
    let total = remainCash;
    if (records && records.stockVolumes) {
      records.stockVolumes.forEach((element: any) => {
        const key = element.code;
        const price = assest[key];
        const volume = element.volume;
        total = total + price * volume;
      });
    }
    return total;
  }

  getStocks() {
    const records = this.PraticeModeService.getRecord();
    let rtnStr = '';
    if (records && records.stockVolumes) {
      records.stockVolumes.forEach((element: any) => {
        rtnStr = rtnStr + element.code + '(volume: ' + element.volume + '), '
      });
    }
    if (rtnStr.length > 0) {
      rtnStr = rtnStr.substring(0, rtnStr.length - 2);
    }

    return rtnStr;
  }

}
