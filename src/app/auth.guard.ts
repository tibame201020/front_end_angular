import { ForwardMessageService } from './forward-message.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './model/user';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private AuthService: AuthService,
        private forwardMessageService:ForwardMessageService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user:User = this.AuthService.userValue;
    // 未登入
    if (user && user.access_token) {
       // 未有權限
      if (route.data['roles'] && JSON.stringify(user.roles).indexOf(route.data['roles']) === -1) {
          this.forwardMessageService.setMessage('未有權限，將跳轉至首頁');
          this.forwardMessageService.setNextRoute('home');
          this.forwardMessageService.setIcon('warning');
          this.router.navigate(['forward']);
          return false;
      }
      return true;
    }
    this.forwardMessageService.setMessage('尚未登入，將跳轉至登入頁面');
    this.forwardMessageService.setIcon('error');
    this.forwardMessageService.setNextRoute('login');
    this.router.navigate(['forward']);

    return false;
  }



  }
