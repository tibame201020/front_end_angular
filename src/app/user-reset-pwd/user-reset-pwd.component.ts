import { SideBarService } from '../side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ForwardMessageService } from '../forward-message.service';
import { pwdValidator } from '../share/validators/pwd.directive';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-reset-pwd',
  templateUrl: './user-reset-pwd.component.html',
  styleUrls: ['./user-reset-pwd.component.css']
})
export class UserResetPwdComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  account:string = '';

  constructor(private route:ActivatedRoute,
    private userService:UserService,
    private forwardMessageService:ForwardMessageService,
    private router: Router,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private SideBarService:SideBarService) { }

  ngOnInit(): void {
    this.SideBarService.hideSideBar();
    this.route.queryParams.subscribe((queryParams) => {
      console.log(queryParams['resetToken']);
      if (queryParams['resetToken']) {
        this.checkResetToken(queryParams['resetToken']);
      } else {
        this.forwardMessageService.setMessage(`don't has the token`);
        this.forwardMessageService.setNextRoute('home');
        this.forwardMessageService.setIcon('error');
        this.router.navigate(['forward']);
      }
    });

    this.createForm();
    if (this.authService.isLogIn()) {
      this.router.navigate(['home']);
    }
  }

  private checkResetToken(token:string) : void{
    this.userService.checkResetToken(token).subscribe(
      res => {
        if (res.token_ok) {
          this.account = res.user_info.account;

        } else {
          this.forwardMessageService.setMessage(`the token is un valid`);
          this.forwardMessageService.setNextRoute('home');
          this.forwardMessageService.setIcon('error');
          this.router.navigate(['forward']);
        }
      }
    )
  }

  private createForm():void {
      this.form = this.formBuilder.group({
        account:[this.account],
        pwd: ['', Validators.required],
        pwd2nd: ['', Validators.required]
      }, {validators: pwdValidator });
  }

  public onSubmit(form : FormGroup):void {
    form.value.account = this.account;
    this.userService.resetPwd(form.value).subscribe(
      res => {
        if (res.message.indexOf("往後請用新密碼登入")) {
          this.forwardMessageService.setMessage(res.message);
          this.forwardMessageService.setNextRoute('home');
          this.forwardMessageService.setIcon('success');
          this.router.navigate(['forward']);
        } else {
          this.forwardMessageService.setMessage('other error, plz contact us');
          this.forwardMessageService.setNextRoute('home');
          this.forwardMessageService.setIcon('error');
          this.router.navigate(['forward']);
        }
      }
    )

  }
}
