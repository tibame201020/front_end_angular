import { SideBarService } from '../side-bar/side-bar.service';
import { ForwardMessageService } from './../forward-message.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-valid-user',
  templateUrl: './valid-user.component.html',
  styleUrls: ['./valid-user.component.css']
})
export class ValidUserComponent implements OnInit {

  public message:string = '';
  // enable the account success; => home
  // the account is already enable; => home
  // the token has expired; => re-send-mail-> or change mail to send

  // the token is not valid; => home

  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private forwardMessageService:ForwardMessageService,
              private router: Router,
              private SideBarService:SideBarService) { }

  ngOnInit(): void {
    this.SideBarService.hideSideBar();
    this.route.queryParams.subscribe((queryParams) => {
      if (!queryParams['validToken']) {
        this.forwardMessageService.setMessage(`don't has the token`);
        this.forwardMessageService.setNextRoute('home');
        this.forwardMessageService.setIcon('error');
        this.router.navigate(['forward']);
      } else {
        this.userService.enableAccount(queryParams['validToken']).subscribe(
          (res) => {
            this.message = res.message
            switch (true) {
              // enable the account success; => home
              case (this.message.indexOf("the account is already enable") !=-1):
                this.forwardMessageService.setMessage(this.message);
                this.forwardMessageService.setNextRoute('home');
                this.forwardMessageService.setIcon('info');
                this.router.navigate(['forward']);
              break;
              // the account is already enable; => home
              case (this.message.indexOf("the account is enable now") !=-1):
                this.forwardMessageService.setMessage(this.message);
                this.forwardMessageService.setNextRoute('home');
                this.forwardMessageService.setIcon('success');
                this.router.navigate(['forward']);
              break;
              // the token has expired; => re-send-mail-> or change mail to send
              case (this.message.indexOf("the token has Expired") !=-1):

              break;
              // the token is not valid; => home
              case (this.message.indexOf("the token is un-valid") !=-1):
                this.forwardMessageService.setMessage(this.message);
                this.forwardMessageService.setNextRoute('home');
                this.forwardMessageService.setIcon('error');
                this.router.navigate(['forward']);
              break;
              // the token can not be verify; => home
              case (this.message.indexOf("the token can not be verify") != -1):
                this.forwardMessageService.setMessage(this.message);
                this.forwardMessageService.setNextRoute('home');
                this.forwardMessageService.setIcon('error');
                this.router.navigate(['forward']);
              break;
              // the account does not exist; => home
              case (this.message.indexOf("the account does not exist") != -1):
                this.forwardMessageService.setMessage(this.message);
                this.forwardMessageService.setNextRoute('home');
                this.forwardMessageService.setIcon('error');
                this.router.navigate(['forward']);
              break;
              // res no mapping any message; => home
              case (true) :
                this.forwardMessageService.setMessage('res no mapping message');
                this.forwardMessageService.setNextRoute('home');
                this.forwardMessageService.setIcon('error');
                this.router.navigate(['forward']);
              break;
            }
          }
        )
      }
    });
  }

}
