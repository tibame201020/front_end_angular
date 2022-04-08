import { StockCompositionComponent } from './share/stock-composition/stock-composition.component';
import { LoginByMailComponent } from './login-by-mail/login-by-mail.component';
import { ValidUserComponent } from './valid-user/valid-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForwardComponent } from './forward/forward.component';
import { AuthGuard } from './auth.guard';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FrontIndexComponent } from './front-index/front-index.component';
import { LoginIndexComponent } from './login-index/login-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './model/role_enum';
import { UserResetPwdComponent } from './user-reset-pwd/user-reset-pwd.component';
import { publishRouter } from './publish/publish.routing';
import { ReadRouter } from './read/read.routing';
import { PraticeRouter } from './pratice/pratice.routing';
import { LoadingComponent } from './share/loading/loading.component';


const routes: Routes = [
  {path:"home", component:FrontIndexComponent},
  {path:"login", component:LoginIndexComponent},
  {
    path:"read",
    children:ReadRouter
  },
  {
    path:"publish",
    children:publishRouter,
    canActivate: [AuthGuard],
    data: { roles: [Role.Publisher] }
  },
  {
    path:"pratice",
    children:PraticeRouter,
    canActivate: [AuthGuard],
    data: { roles: [Role.Reader] }
  },
  {path:"signUp", component:UserRegisterComponent},
  {path:"login/forgot_password", component:ForgotPasswordComponent},
  {path:"login/login_by_mail", component:LoginByMailComponent},
  {path:"forward", component:ForwardComponent},
  {path:"valid", component:ValidUserComponent},
  {path:"user/reset_pwd", component:UserResetPwdComponent},
  {path:'', redirectTo:"/home", pathMatch: 'full'}
  ,{path:"test", component:LoadingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
