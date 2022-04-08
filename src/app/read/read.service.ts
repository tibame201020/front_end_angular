import { Article } from './../model/article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  article!: Article;

  constructor(private http: HttpClient) { }

  getAllPublish(): Observable<Article[]> {
    return this.http.get<Article[]>(environment.backend.baseURL + `api/read/all`);
  }

  getOwnPublish(account:string): Observable<Article[]> {
    return this.http.post<Article[]>(environment.backend.baseURL + `api/read/own`, account);
  }

  setArticle(article:Article) {
    this.article = article;
  }

  getArticle() {
    return this.article;
  }
}
