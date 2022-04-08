import { NewsService } from './../read/news.service';
import { PraticeModeService } from './../pratice/pratice-mode.service';
import { ReadService } from './../read/read.service';
import { SideBarService } from '../side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Article } from '../model/article';

@Component({
  selector: 'app-front-index',
  templateUrl: './front-index.component.html',
  styleUrls: ['./front-index.component.css']
})
export class FrontIndexComponent implements OnInit {
  lastestArticles: any[] = [];
  lastestNews: any[] = [];
  practiceRankTotal: any[] = [];
  practiceRankCash: any[] = [];
  practiceRankStock: any[] = [];
  getArticlesStates = 0;
  getNewsStates = 0;
  getRankStates = 0;

  constructor(public authService: AuthService,
    private SideBarService: SideBarService,
    private ReadService: ReadService,
    private PraticeModeService: PraticeModeService,
    private NewsService: NewsService,
    private router: Router) { }
  ngOnInit(): void {
    this.SideBarService.hideSideBar();
    this.ReadService.getAllPublish().subscribe(
      res => {
        res.forEach(obj => {
          if (this.lastestArticles.length < 5) {
            this.lastestArticles.push(obj);
          } else {
            stop;
          }
        })
        this.getArticlesStates = 2;
      }
    )

    this.NewsService.getNews().subscribe(
      res => {
        res.forEach(obj => {
          if (this.lastestNews.length < 5) {
            this.lastestNews.push(obj);
          } else {
            stop;
          }
        })
        this.getNewsStates = 2;
      }
    )

    if (this.authService.isLogIn()) {
      this.PraticeModeService.getTopList().subscribe(
        res => {
          res.forEach(obj => {
            if (this.practiceRankTotal.length < 5) {
              this.practiceRankTotal.push({ name: obj.accountOutline, money: obj.total });
              this.practiceRankStock.push({ name: obj.accountOutline, money: obj.total - obj.cash });
              this.practiceRankCash.push({ name: obj.accountOutline, money: obj.cash });
            } else {
              stop;
            }
          })
          this.practiceRankTotal.sort(function (a, b): number {
            return b.money - a.money;
          })
          this.getRankStates = 2;
        }
      )
    }
  }

  toPracticeRank() {
    this.router.navigate(['pratice/home']);
  }

  toArticleDetail(article:Article) {
    this.ReadService.setArticle(article);
    this.router.navigate(['read/article_detail']);
  }


}
