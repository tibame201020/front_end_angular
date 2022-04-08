import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router,) {
    let storage_user = sessionStorage.getItem('user') || '{}';
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(storage_user));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public loginByMail(param: any): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + `api/user/loginByShortCode`, param);
  }

  public handleLogin(res: any): void {
    if (res.access_token) {
      res.user_info.access_token = res.access_token;
      res.user_info.refresh_token = res.refresh_token;
      res.user_info.pwd = '';
      res.user_info.changePwd = '';
      this.currentUserSubject.next(res.user_info);
      sessionStorage.setItem('user', JSON.stringify(res.user_info));
    } else {
      this.currentUserSubject.next(null);
      sessionStorage.removeItem('user');
    }
  }

  public validUser(user: User): Observable<Boolean> {
    let rtn = this.http.post<any>(environment.backend.baseURL + `api/user/login`, user);
    rtn.subscribe(
      (res: any) => {
        this.handleLogin(res);
      }
    )
    return rtn;
  }

  logout() {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['home']);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser;
  }

  public get userValue(): User {
    return this.currentUserSubject.value;
  }

  isLogIn(): Boolean {
    let rtn = false;
    this.getCurrentUser().subscribe(
      user => {
        if (user != null) {
          if (user.access_token != null) {
            rtn = true;
          }
        }
      }
    )
    return rtn;
  }

  loginByMailCheck(mail: string): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + `api/user/requiredUseMailLogin`, mail);
  }


  test(): Observable<string> {
    return this.http.post<string>(environment.backend.baseURL + `api/user/testMock`, "");
  }
}
