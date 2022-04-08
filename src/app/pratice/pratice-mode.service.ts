import { RecordInfo } from 'src/app/model/recordInfo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PraticeModeService {

  record: any;
  assest: any;
  states: number = 0;

  constructor(private http: HttpClient) { }

  getSelfRecord(account: string): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/practice/getSelfRecord', account);
  }

  createSelfRecord(account: string): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/practice/createSelfRecord', account);
  }

  getPriceByCode(code: string): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/twse/getPriceByCode', code);
  }

  buyStock(form: any): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/practice/buy', form);
  }

  sellStock(form: any): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/practice/sell', form);
  }

  getHistory(form: any): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/practice/getHistory', form);
  }

  changeVisibility(account: string, visibility: string): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/practice/changeVisibility', { 'accountOutline': account, 'visibility': visibility });
  }

  resetRecord(account: string): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/practice/resetRecord', account);
  }

  getTopList(): Observable<RecordInfo[]> {
    return this.http.get<RecordInfo[]>(environment.backend.baseURL + 'api/practice/getTopList');
  }

  setRecord(record: any) {
    this.record = record;
    if (record) {
      this.states = 2;
    } else {
      this.states = 1;
    }
  }

  getRecord() {
    return this.record;
  }

  setAssest(assest: any) {
    this.assest = assest;
  }

  getAssest() {
    return this.assest;
  }

}
