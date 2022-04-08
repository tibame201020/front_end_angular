import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { CkeditorComponent } from '../rich-text/ckeditor/ckeditor.component';
import { DatePickerRangeComponent } from './date-picker-range/date-picker-range.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CandlestickChartComponent } from './candlestick-chart/candlestick-chart.component';
import { KLineComponent } from './k-line/k-line.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { StockBasicInfoComponent } from './stock-basic-info/stock-basic-info.component';
import { ArticleIntroComponent } from './article-intro/article-intro.component';
import { ArticleDetailComponent } from '../read/article-detail/article-detail.component';
import { StockCompositionComponent } from './stock-composition/stock-composition.component';
import { AssestCompositionComponent } from './assest-composition/assest-composition.component';
import { LoadingComponent } from './loading/loading.component';
import { SelfAssetsHistoryComponent } from './self-assets-history/self-assets-history.component';
import { RankEchartsComponent } from './rank-echarts/rank-echarts.component';



@NgModule({
  imports: [
    CommonModule,
    CKEditorModule,
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  declarations: [
    CkeditorComponent,
    DatePickerRangeComponent,
    CandlestickChartComponent,
    KLineComponent,
    StockBasicInfoComponent,
    ArticleIntroComponent,
    ArticleDetailComponent,
    StockCompositionComponent,
    AssestCompositionComponent,
    LoadingComponent,
    SelfAssetsHistoryComponent,
    RankEchartsComponent
  ],
  exports:[
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    FlexLayoutModule,
    CkeditorComponent,
    DatePickerRangeComponent,
    AngularMaterialModule,
    CandlestickChartComponent,
    KLineComponent,
    ArticleIntroComponent,
    ArticleDetailComponent,
    StockCompositionComponent,
    AssestCompositionComponent,
    LoadingComponent,
    SelfAssetsHistoryComponent,
    RankEchartsComponent
  ]
})
export class ShareModule {}

