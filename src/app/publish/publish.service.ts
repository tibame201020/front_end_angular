import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublishService {

  constructor(private http: HttpClient) { }

  getCodeNmLs(code: string): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/twse/quickSearch', code);
  }

  getBasicInfo(code: string, startDate: any, endDate: any): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/twse/getBasicInfo', { code, "startDate": startDate, "endDate": endDate });
  }

  getCompanyInfo(code: string): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/twse/getCompanyInfo', code);
  }

  checkCodeNm(codeNm:string): Observable<Boolean> {
    return this.http.post<Boolean>(environment.backend.baseURL + `api/twse/checkCodeNm`, codeNm);
  }

  getAllPublish(): Observable<Boolean> {
    return this.http.get<Boolean>(environment.backend.baseURL + `api/read/all`);
  }

}
