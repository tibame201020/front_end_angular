import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { NewsComponent } from './news/news.component';
import { StockInfoComponent } from './stock-info/stock-info.component';
import { ShareModule } from '../share/share.module';



@NgModule({
  declarations: [
    AllComponent,
    NewsComponent,
    StockInfoComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class ReadModule { }
