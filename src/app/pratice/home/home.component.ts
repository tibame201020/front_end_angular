import { RecordInfo } from 'src/app/model/recordInfo';
import { PraticeModeService } from './../pratice-mode.service';
import { PRATICE_SIDE_BAR_CONFIG } from './../side-bar-config';
import { SideBarService } from 'src/app/side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  states = 0;
  selectAccountStates = 0;
  remainCashList: any[] = [];
  stockAssetsList: any[] = [];
  totalList: any[] = [];


  selectAccount: string = '';

  constructor(private SideBarService: SideBarService,
    public PraticeModeService: PraticeModeService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PRATICE_SIDE_BAR_CONFIG);
    this.PraticeModeService.getTopList().subscribe(
      res => {
        if (res && res.length) {
          res.forEach(element => {
            const total = element.total;
            const remainCash = element.cash;
            const stockAssets = total - remainCash;
            const account = element.accountOutline;
            this.remainCashList.push({ name: account, money: remainCash })
            this.stockAssetsList.push({ name: account, money: stockAssets })
            this.totalList.push({ name: account, money: total })
          });

          this.remainCashList.sort(function (a, b): number {
            return b.money - a.money;
          })
          this.stockAssetsList.sort(function (a, b): number {
            return b.money - a.money;
          })
          this.totalList.sort(function (a, b): number {
            return b.money - a.money;
          })
          this.states = 2;
        } else {
          this.states = 1;
        }
      }
    )
  }

  getSelectAccount(account: string) {
    this.selectAccountStates = 0;
    this.PraticeModeService.setRecord(null);
    this.selectAccount = account;
    this.PraticeModeService.getSelfRecord(this.selectAccount).subscribe(
      res => {
        this.PraticeModeService.setRecord(res.recordInfo);
        this.PraticeModeService.setAssest(res.assest);
        this.selectAccountStates = 2;
      }
    )
  }


}
