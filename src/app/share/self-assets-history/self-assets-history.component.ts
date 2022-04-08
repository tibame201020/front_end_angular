import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-self-assets-history',
  templateUrl: './self-assets-history.component.html',
  styleUrls: ['./self-assets-history.component.css']
})
export class SelfAssetsHistoryComponent implements OnInit {
  options: any;
  @Input() inputData!: any;

  constructor() { }

  ngOnInit(): void {
    this.setOption();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setOption();
  }

  setOption() {
    let date_array = this.inputData.date_array;
    let stock_asstes_array = this.inputData.stock_asstes_array;
    let cash_assets_array = this.inputData.cash_assets_array;
    let total_assets_array = this.inputData.total_assets_array;
    this.options = {
      legend: {
        data: [
          { name: 'stock-assets' },
          { name: 'cash-assets' },
          { name: 'total-assets' },
        ],
        align: 'left'
      },
      tooltip: {
        confine: true,
        trigger: 'axis',
        axisPointer: {
          animation: true,
          type: 'cross',
          lineStyle: {
            color: '#376df4',
            width: 2,
            opacity: 1
          }
        }
      },
      xAxis: {
        type: 'category',
        data: date_array,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        }
      },
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 0,
          end: 100
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          y: '90%',
          start: 0,
          end: 100
        }
      ],
      series: [
        {
          name: 'stock-assets',
          type: 'line',
          data: stock_asstes_array,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'cash-assets',
          type: 'line',
          data: cash_assets_array,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
        {
          name: 'total-assets',
          type: 'line',
          data: total_assets_array,
          animationDelay: (idx: number) => idx * 10 + 100,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5
    };


  }

}
