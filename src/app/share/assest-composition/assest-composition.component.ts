import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-assest-composition',
  templateUrl: './assest-composition.component.html',
  styleUrls: ['./assest-composition.component.css']
})
export class AssestCompositionComponent implements OnInit {

  @Input() volumeData: any;
  @Input() priceData: any;
  @Input() onlyStock:boolean = false;
  totalPrice = 0;
  options: any;

  constructor() { }

  ngOnInit(): void {
    if (this.volumeData && this.priceData) {
      this.setOption();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.priceData) {
      this.setOption();
    }
  }


  setOption() {
    this.totalPrice = 0;
    const data: { value: number; name: string; }[] = [];
    if (this.volumeData) {
      for (let index = 0; index < this.volumeData.length; index++) {
        const element = this.volumeData[index];
        const code = element.code;
        const volume = element.volume;
        const price = this.priceData[code];
        data.push({
          name: code + '(股數: ' + volume + ', 單價:' + price + ')',
          value: volume * price
        })
        this.totalPrice = this.totalPrice + volume * price;
      }
    }
    if (!this.onlyStock) {
      data.push({
        name: 'cash',
        value: this.priceData['remainCash']
      })
      this.totalPrice = this.totalPrice + this.priceData['remainCash'];
    }
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
