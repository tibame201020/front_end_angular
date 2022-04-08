import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rank-echarts',
  templateUrl: './rank-echarts.component.html',
  styleUrls: ['./rank-echarts.component.css']
})
export class RankEchartsComponent implements OnInit {
  @Input()
  rankArray!: any[];
  options: any;
  colors = [
    "lightred",
    "lightredblue",
    "lightredred",
    "lightredgreen",
    "lightredyellow"
  ];

  constructor() { }

  ngOnInit(): void {
    this.generateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateData();
  }

  generateData() {
    this.options = {
      tooltip: {

      },
      dataset: [
        {
          dimensions: ['name', 'money'],
          source:
            this.rankArray
        },
        {
          transform: {
            type: 'sort',
            config: { dimension: 'money', order: 'desc' }
          }
        }
      ],
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0, rotate: 30 }
      },
      yAxis: {},
      series: {
        type: 'bar',
        encode: { x: 'name', y: 'money' },
        datasetIndex: 1,
        barWidth: '15%'
      }
    };
  }

}
