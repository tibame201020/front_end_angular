import { PraticeModeService } from './../pratice-mode.service';
import { AuthService } from './../../auth.service';
import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrls: ['./stock-manage.component.css']
})
export class StockManageComponent implements OnInit {

  @Input() code!: string;
  price?: number;

  form = this.formBuilder.group({
    volume: []
  });

  constructor(private PraticeModeService: PraticeModeService,
    private formBuilder: FormBuilder,
    private AuthService: AuthService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code'].currentValue) {
      this.PraticeModeService.getPriceByCode(this.code).subscribe(
        res => { this.price = res }
      )
    }
  }

  buy() {

    if (this.price && this.code && this.form.value.volume) {
      Swal.fire({
        title: 'Are you sure to buy?',
        text: 'code : ' + this.code + ' ,price : ' + this.price + ',volume : ' + this.form.value.volume,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.form.value.price = this.price;
          this.form.value.code = this.code;
          this.form.value.account = this.AuthService.userValue.account;
          this.PraticeModeService.buyStock(this.form.value).subscribe(
            res => {
              if (res.status) {
                this.PraticeModeService.setRecord(res.result);
                this.PraticeModeService.setAssest(res.assest);
                Swal.fire({
                  icon: 'success',
                  title: 'u buy success',
                  showConfirmButton: false,
                  timer: 1500
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: res.result,
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            }
          )

        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'the code & the volume is needed',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  sell() {
    if (this.price && this.code && this.form.value.volume) {
      Swal.fire({
        title: 'Are you sure to sell?',
        text: 'code : ' + this.code + ' ,price : ' + this.price + ',volume : ' + this.form.value.volume,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.form.value.price = this.price;
          this.form.value.code = this.code;
          this.form.value.account = this.AuthService.userValue.account;
          this.PraticeModeService.sellStock(this.form.value).subscribe(
            res => {
              if (res.status) {
                this.PraticeModeService.setRecord(res.result);
                this.PraticeModeService.setAssest(res.assest);
                Swal.fire({
                  icon: 'success',
                  title: 'u sell success',
                  showConfirmButton: false,
                  timer: 1500
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: res.result,
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            }
          )

        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'the code & the volume is needed',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
