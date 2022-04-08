import { PraticeModeService } from './../pratice-mode.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/side-bar/side-bar.service';
import { PRATICE_SIDE_BAR_CONFIG } from '../side-bar-config';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  dataRange: any;
  states: number = 0;


  constructor(private SideBarService: SideBarService, private AuthService: AuthService, private PraticeModeService: PraticeModeService) { }

  date_array:any[] = [];
  stock_asstes_array:any[] = [];
  cash_assets_array:any[] = [];
  total_assets_array:any[] = [];

  data:any;


  ngOnInit(): void {
    this.SideBarService.setSideBar(PRATICE_SIDE_BAR_CONFIG);
  }

  getDataRange(dataRange: any) {
    this.dataRange = dataRange;
    const startDate = this.dataRange.start ? this.dataRange.start.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    const endDate = this.dataRange.end ? this.dataRange.end.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    if (startDate && endDate) {
      const account = this.AuthService.userValue.account;
      let form = {
        'account': account,
        'startDate': startDate,
        'endDate': endDate
      }
      this.PraticeModeService.getHistory(form).subscribe(
        res => {
          if (res.status && res.result && res.result[res.result.length - 1] && res.result[res.result.length - 1].price && res.result[res.result.length - 1].price.remainCash) {
            this.splitArray(res.result);
            this.states = 2;
          } else {
            this.states = 1;
          }
        }
      )
    }
  }

  splitArray(data: any) {
    this.date_array = [];
    this.cash_assets_array = [];
    this.stock_asstes_array = [];
    this.total_assets_array = [];
    data.forEach((element: { date: any; price: { [x: string]: any; remainCash: number; }; volume: { code: any; volume: any; }[]; }) => {
      this.date_array.push(element.date);
      this.cash_assets_array.push(element.price.remainCash);
      if (element.volume) {
        let stock_assets = 0;
        element.volume.forEach((volumeObj: { code: any; volume: any; }) => {
          let code = volumeObj.code;
          let volume = volumeObj.volume;
          let price = element.price[code];

          stock_assets = stock_assets + volume * price;
        });
        this.stock_asstes_array.push(stock_assets);
        this.total_assets_array.push(element.price.remainCash + stock_assets);
      } else {
        this.stock_asstes_array.push('-');
        this.total_assets_array.push(element.price.remainCash);
      }
      this.data = {};
      this.data.date_array = this.date_array;
      this.data.cash_assets_array = this.cash_assets_array;
      this.data.stock_asstes_array = this.stock_asstes_array;
      this.data.total_assets_array = this.total_assets_array;
    });

  }

}
