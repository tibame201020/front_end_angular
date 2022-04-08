import { PraticeModeService } from './../pratice-mode.service';
import { SideBarService } from './../../side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';
import { PRATICE_SIDE_BAR_CONFIG } from '../side-bar-config';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  optionValue = 'own';
  states = 0;

  constructor(private SideBarService: SideBarService,
    public PraticeModeService: PraticeModeService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PRATICE_SIDE_BAR_CONFIG);
    this.PraticeModeService.getSelfRecord(this.authService.userValue.account).subscribe(
      res => {
        this.PraticeModeService.setRecord(res.recordInfo);
        this.PraticeModeService.setAssest(res.assest);
        if (!res.recordInfo) {
          this.router.navigate(['pratice/home']);
        } else {
          this.states = 2;
          this.optionValue = this.PraticeModeService.getRecord().visibility;
        }
      }
    );
  }

  visibilityChange() {
    Swal.fire({
      title: 'Do you really want to change visibility to ' + this.optionValue + ' ?',
      showCancelButton: true,
      confirmButtonText: 'Change!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.PraticeModeService.changeVisibility(this.authService.userValue.account, this.optionValue).subscribe(
          res => {
            if (res.status) {
              this.refreshRecord();
              Swal.fire({
                icon: 'success',
                title: res.msg,
                showConfirmButton: false,
                timer: 1500
              })
            } else {
              Swal.fire(res.msg, '', 'error')
            }
          }
        )
      } else {
        this.optionValue = this.optionValue == 'all' ? 'own' : 'all';
      }
    })
  }

  resetRecord() {
    Swal.fire({
      title: 'Do you really want to reset ur record ?',
      showCancelButton: true,
      confirmButtonText: 'Reset!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.PraticeModeService.resetRecord(this.authService.userValue.account).subscribe(
          res => {
            console.log(res)
            if (res.status) {
              this.refreshRecord();
              Swal.fire({
                icon: 'success',
                title: res.msg,
                showConfirmButton: false,
                timer: 1500
              })
            } else {
              Swal.fire(res.msg, '', 'error')
            }
          }
        )
      }
    })
  }

  refreshRecord() {
    this.PraticeModeService.getSelfRecord(this.authService.userValue.account).subscribe(
      res => {
        this.PraticeModeService.setRecord(res.recordInfo);
        this.PraticeModeService.setAssest(res.assest);
        this.optionValue = this.PraticeModeService.getRecord().visibility;
      })
  }


}

