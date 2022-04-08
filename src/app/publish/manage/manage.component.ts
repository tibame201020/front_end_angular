import { Article } from './../../model/article';
import { AuthService } from './../../auth.service';
import { ArticleService } from './../../share/article.service';
import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/side-bar/side-bar.service';
import { PUBLISH_SIDE_BAR_CONFIG } from '../side-bar-config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  articleArray: any[] = [];
  publishedArray: any[] = [];
  historyArray: any[] = [];

  constructor(private SideBarService: SideBarService,
    private ArticleService: ArticleService,
    private AuthService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PUBLISH_SIDE_BAR_CONFIG);
    this.refreshArray();
  }

  refreshArray() {
    this.ArticleService.findByAccount(this.AuthService.userValue.account).subscribe(
      res => {
        let publishedAry: any[] = [];
        let historyAry: any[] = []
        this.articleArray = res;
        this.articleArray.forEach(element => {
          if (element.state == 'publish') {
            publishedAry.push(element);
          } else {
            historyAry.push(element);
          }
        });
        this.publishedArray = publishedAry;
        this.historyArray = historyAry;
      }
    );
  }

  editArticle(article: Article) {
    this.router.navigate(['/publish/edit']);
    this.ArticleService.saveEditData(article);
  }

  deleteArticle(article: Article) {
    this.router.navigate(['/publish/manage']);
    this.ArticleService.delete(article).subscribe(
      res => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'the article ' + article.title +' was delete',
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'the article publish was failed, plz contact us',
          })
        }
        this.refreshArray();
      }
    )
  }

  restoreArticle(article: Article) {
    this.router.navigate(['/publish/manage']);
    this.ArticleService.restore(article).subscribe(
      res => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'the article ' + article.title +' was restore',
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'the article publish was failed, plz contact us',
          })
        }
        this.refreshArray();
      }
    )
  }


}
