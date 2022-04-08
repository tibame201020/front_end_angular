import { SideBarService } from '../side-bar/side-bar.service';
import Swal from 'sweetalert2'
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-by-mail',
  templateUrl: './login-by-mail.component.html',
  styleUrls: ['./login-by-mail.component.css']
})
export class LoginByMailComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  mailCheck: boolean = false;
  alreadyCheck:boolean = false;
  mail: string = '';
  simpleCode: string = '';

  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private SideBarService:SideBarService) { }

  ngOnInit(): void {
    this.SideBarService.hideSideBar();
    this.createForm();
    if (this.authService.isLogIn()) {
      this.router.navigate(['home']);
    }
    this.mail = '';
    this.simpleCode = '';
    this.mailCheck = false;
    this.alreadyCheck = false;
  }

  private createForm(): void {
    const emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    this.form = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.pattern(emailRegex)]]
    });
  }

  public onSubmit(form: FormGroup): void {
    this.authService.loginByMailCheck(form.value.mail).subscribe(
      res => {
        this.mailCheck = res.result;
        if (this.mailCheck) {
          this.mail = form.value.mail;
          this.simpleCode = '';
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'already sent the simple code to ur email',
            showConfirmButton: false,
            timer: 900
          })
        } else {
          this.simpleCode = '';
          this.swalError(form);
        }
      })

  }

  useSimpleCodeLogin(): void {
    let param = {
      account: this.mail?this.mail:this.form.value.mail,
      shortRandom: this.simpleCode
    };
    this.authService.loginByMail(param).subscribe(
      (res: any) => {
        this.authService.handleLogin(res);
        this.swalDialog(res.rtnStatusCode, res.rtnMsg);
      }
    )
  }

  swalDialog(statusCode: number, msg: string): void {
    switch (statusCode) {
      case 0:
        Swal.fire({
          icon: 'error',
          text:msg,
        })
        break;
      case 1:
        Swal.fire({
          icon: 'success',
          text:msg,
        }).then(() => {
          this.router.navigate(['home']);
        });
        break;
      case 2:
        Swal.fire({
          icon: 'info',
          text:msg,
        })
        break;
    }

  }

  checkSimpleCodeLength(): boolean {
    if (this.simpleCode.length == 5) {
      return false;
    } else {
      return true;
    }
  }

  checkSimpleCodeLengthBeingEnter(): boolean {
    if (this.simpleCode.length == 5) {
      return false;
    } else {
      return true;
    }
  }

  swalError(form: FormGroup): void {
    const register_link = `<a href="/signUp">use the email register?</a>`;
    Swal.fire({
      icon: 'error',
      title: 'error',
      text: '沒有相符的email',
      footer: register_link
    }).then(() => {
      form.reset();
    });
  }

}
