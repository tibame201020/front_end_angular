import { Article } from './../model/article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  editData?: Article;

  constructor(private http: HttpClient) { }

  save(article: Article): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/publish/save', article);
  }

  delete(article: Article): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/publish/deleteArticle', article);
  }
  restore(article: Article): Observable<any> {
    return this.http.post<any>(environment.backend.baseURL + 'api/publish/restoreArticle', article);
  }

  findByAccount(account: string): Observable<Article[]> {
    return this.http.post<Article[]>(environment.backend.baseURL + 'api/publish/manage', account);
  }

  saveEditData(data:Article) {
    this.editData = data;
  }

  getEditData() {
    return this.editData;
  }

  clearEditData() {
    this.editData = undefined;
  }

}
