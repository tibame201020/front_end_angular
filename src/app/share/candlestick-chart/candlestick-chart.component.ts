import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PublishService } from 'src/app/publish/publish.service';

@Component({
  selector: 'app-candlestick-chart',
  templateUrl: './candlestick-chart.component.html',
  styleUrls: ['./candlestick-chart.component.css']
})
export class CandlestickChartComponent implements OnInit {

  @Input() code!: string;
  dataLs = [];
  companyInfo = {};
  dataRange: any;
  startDate: any;
  endDate: any;
  showHide:boolean = false;
  constructor(private PublishService: PublishService) { }
  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.startDate && this.endDate && changes['code']) {
      this.getBasicInfo(this.code, this.startDate, this.endDate);
      this.getCompanyInfo(this.code);
    }
  }
  getBasicInfo(codeNm: string, startDate: any, endDate: any) {
    if (!codeNm || !startDate || !endDate) {
      return;
    }

    if (codeNm.trim().indexOf(' - ') != -1) {
      codeNm = codeNm.trim().split(' - ')[0].trim();
    }
    if (codeNm.trim().indexOf('-') != -1) {
      codeNm = codeNm.trim().split('-')[0].trim();
    }
    this.PublishService.getBasicInfo(codeNm, startDate, endDate).subscribe(
      res => {
        this.showHide = res.status;
        this.dataLs = res;
      }
    );
  }

  getCompanyInfo(code:string) {
    if (!code){
      return;
    }
    this.PublishService.getCompanyInfo(this.code).subscribe(
      res => {
        if (res) {
          this.companyInfo = res[0];
        }
    });
  }

  getDataRange(dataRange: any) {
    this.dataRange = dataRange;
    const startDate = this.dataRange.start ? this.dataRange.start.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    const endDate = this.dataRange.end ? this.dataRange.end.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    this.startDate = startDate;
    this.endDate = endDate;

    if (startDate && endDate && this.code) {
      this.getBasicInfo(this.code, startDate, endDate);
      this.getCompanyInfo(this.code);
    }
  }
}
