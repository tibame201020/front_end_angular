import { SideBarService } from '../side-bar/side-bar.service';
import { ForwardMessageService } from './../forward-message.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forward',
  templateUrl: './forward.component.html',
  styleUrls: ['./forward.component.css']
})
export class ForwardComponent implements OnInit {
  public seconds:number = 2;
  constructor(
    public forwardMessageService: ForwardMessageService,
    private router: Router,
    private SideBarService:SideBarService
    ) { }

    private forwardPage():void {
      const interval = setInterval(()=>{
        this.seconds = this.seconds - 1;
      }, 1000);
      const timeout = setTimeout(() => {
        if (window.location.pathname == '/forward') {
          this.router.navigate([this.forwardMessageService.getNextRoute]);
        }
        clearInterval(interval);
        clearTimeout(timeout);
      }, this.seconds * 1000);
    }

  ngOnInit(): void {
    this.SideBarService.hideSideBar();
    let icon:any;
    if (this.forwardMessageService.getIcon) {
      icon = this.forwardMessageService.getIcon;
    } else {
      icon = 'warning'
    }
    const link = `<a class="nav-link" href="`+ this.forwardMessageService.getNextRoute +`">`+ this.forwardMessageService.getNextRoute +`</a>`;
    Swal.fire({
      icon: icon,
      title: this.forwardMessageService.getMessage,

      footer: link
    }).then(() => {
      this.forwardPage();
    });
  }

}
