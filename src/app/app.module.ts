import { PraticeModule } from './pratice/pratice.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FrontIndexComponent } from './front-index/front-index.component';
import { LoginIndexComponent } from './login-index/login-index.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ForwardComponent } from './forward/forward.component';
import { JwtInterceptor } from './inteceptor/jwt.interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ValidUserComponent } from './valid-user/valid-user.component';
import { UnValidUserComponent } from './un-valid-user/un-valid-user.component';
import { LoginByMailComponent } from './login-by-mail/login-by-mail.component';
import { UserResetPwdComponent } from './user-reset-pwd/user-reset-pwd.component';
import { CustomFormControlComponent } from './custom-form-control/custom-form-control.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { ShareModule } from './share/share.module';
import { PublishModule } from './publish/publish.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReadModule } from './read/read.module';


@NgModule({
  declarations: [
    AppComponent,
    FrontIndexComponent,
    LoginIndexComponent,
    UserRegisterComponent,
    ForwardComponent,
    ForgotPasswordComponent,
    ValidUserComponent,
    UnValidUserComponent,
    LoginByMailComponent,
    UserResetPwdComponent,
    CustomFormControlComponent,
    SideBarComponent,
    HeaderComponent
  ],
  imports: [
    ShareModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

