import { ReadService } from './../../read/read.service';
import { Article } from './../../model/article';
import { Component, Input, OnInit } from '@angular/core';
import { ckeditorConfig } from 'src/app/read/ck-editor-config';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-intro',
  templateUrl: './article-intro.component.html',
  styleUrls: ['./article-intro.component.css']
})
export class ArticleIntroComponent implements OnInit {

  @Input() article!:Article;

  public Editor = ClassicEditor;
  public config = ckeditorConfig;

  constructor(
    private ReadService:ReadService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  toArticleDetail(article:Article) {
    this.ReadService.setArticle(article);
    this.router.navigate(['read/article_detail']);
  }
}
