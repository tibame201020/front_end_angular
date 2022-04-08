import { SideBarService } from '../side-bar/side-bar.service';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrls: ['./login-index.component.css']
})
export class LoginIndexComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(private userService:UserService,
              private router: Router,
              private formBuilder:FormBuilder,
              private authService:AuthService,
              private SideBarService:SideBarService) { }

  ngOnInit(): void {
    this.createForm();
    this.SideBarService.hideSideBar();
  }

  private createForm():void {
      this.loginForm = this.formBuilder.group({
        account:['', Validators.required],
        pwd:['', Validators.required]
      });
  }

  public onLoginSubmit(loginForm : FormGroup):void {
    const forgotPwd = `<a href="login/forgot_password">Forgot Password ?</a>`;
    const reSendMail = `<a href="login/forgot_password">re send valid mail</a>`;
    this.authService.validUser(loginForm.value).subscribe(
      (res:any) => {
        if (res.access_token) {
          // 驗證成功
          this.router.navigate(['home']);
        } else {
          if (res.un_success_msg === 'the account is not enable yet') {
            res.link = reSendMail;
            res.icon = 'info';
          } else {
            res.link = forgotPwd;
            res.icon = 'error';
          }
          Swal.fire({
            icon: res.icon,
            title: 'Oops...',
            text: res.un_success_msg,
            footer: res.link
          });
        }
      }
    )
  }
}
