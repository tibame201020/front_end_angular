import { PublishService } from 'src/app/publish/publish.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stock-basic-info',
  templateUrl: './stock-basic-info.component.html',
  styleUrls: ['./stock-basic-info.component.css']
})
export class StockBasicInfoComponent implements OnInit {
  @Input() inputData!: any;
  publishDate?: string;
  code?: string;
  name?: string;
  chairman?: string;
  manager?: string;
  address?: string;
  paidInCapital?: string;
  url?: string;

  noData = true;


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputData']['currentValue']) {
      this.noData = false;
      this.publishDate = changes['inputData']['currentValue']['上市日期'];
      this.code = changes['inputData']['currentValue']['公司代號'];
      this.name = changes['inputData']['currentValue']['公司名稱'];
      this.chairman = changes['inputData']['currentValue']['董事長'];
      this.manager = changes['inputData']['currentValue']['總經理'];
      this.address = changes['inputData']['currentValue']['住址'];
      this.paidInCapital = changes['inputData']['currentValue']['實收資本額'];
      this.url = changes['inputData']['currentValue']['網址'];
    } else {
      this.noData = true;
    }
  }
  ngOnInit(): void {
  }

}
