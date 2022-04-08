import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stock-composition',
  templateUrl: './stock-composition.component.html',
  styleUrls: ['./stock-composition.component.css']
})
export class StockCompositionComponent implements OnInit {

  @Input() data:any;
  options: any;
  totalVolume = 0;
  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      this.setOption();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.setOption();
    }
  }


  setOption() {
    this.totalVolume = 0;
    const data: { value: number; name: string; }[] = [];
    this.data.forEach((element: { volume: any; code: any; }) => {
      data.push({
        value: element.volume,
        name: element.code + '(股數: ' + element.volume +')'
      });
      this.totalVolume = this.totalVolume + element.volume;
    });
    this.options = {
      legend: {
        x:'left',
        y: 'top'
      },
      tooltip: {},
      series: [
        {
          name: 'stock-composition',
          type: 'pie',
          radius: '35%',
          center: ['35%', '40%'],
          data: data,
          itemStyle: {
            normal: {
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              label: {
                  show: true,
                  formatter:'{b}{d}%',
                  distance: 0.7
                }
            }
          }
        }
      ]
    }
  }
}
