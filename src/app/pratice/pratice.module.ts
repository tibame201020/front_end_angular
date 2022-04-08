import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { HomeComponent } from './home/home.component';
import { MyselfComponent } from './myself/myself.component';
import { SelfInfoComponent } from './self-info/self-info.component';
import { StockManageComponent } from './stock-manage/stock-manage.component';
import { HistoryComponent } from './history/history.component';
import { SettingComponent } from './setting/setting.component';



@NgModule({
  declarations: [
    HomeComponent,
    MyselfComponent,
    SelfInfoComponent,
    StockManageComponent,
    HistoryComponent,
    SettingComponent
  ],
  imports: [
    ShareModule
  ]
})
export class PraticeModule { }
