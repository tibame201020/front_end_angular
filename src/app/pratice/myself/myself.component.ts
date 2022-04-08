import { RecordInfo } from 'src/app/model/recordInfo';
import { PraticeModeService } from '../pratice-mode.service';
import { PRATICE_SIDE_BAR_CONFIG } from './../side-bar-config';
import { SideBarService } from 'src/app/side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-myself',
  templateUrl: './myself.component.html',
  styleUrls: ['./myself.component.css']
})
export class MyselfComponent implements OnInit {

  constructor(private SideBarService:SideBarService,
    public PraticeModeService:PraticeModeService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PRATICE_SIDE_BAR_CONFIG);
    this.PraticeModeService.getSelfRecord(this.authService.userValue.account).subscribe(
      res => {
        this.PraticeModeService.setRecord(res.recordInfo);
        this.PraticeModeService.setAssest(res.assest);
      }
    );
  }

  createSelfRecord() {
    this.PraticeModeService.createSelfRecord(this.authService.userValue.account).subscribe(
      res => {
        this.PraticeModeService.setRecord(res.recordInfo);
        this.PraticeModeService.setAssest(res.assest);
      }
    );
  }

}
