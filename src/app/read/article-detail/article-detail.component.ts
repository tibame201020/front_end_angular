import { Article } from '../../model/article';
import { ReadService } from '../read.service';
import { Component, OnInit } from '@angular/core';
import { READ_SIDE_BAR_CONFIG } from '../side-bar-config';
import { SideBarService } from 'src/app/side-bar/side-bar.service';
import { ckeditorConfig } from 'src/app/read/ck-editor-config';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  public Editor = ClassicEditor;
  public config = ckeditorConfig;
  constructor(
    public ReadService:ReadService,
    private SideBarService:SideBarService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    if (this.ReadService.getArticle() == undefined) {
      this.router.navigate(['read']);
    } else {
      this.SideBarService.setSideBar(READ_SIDE_BAR_CONFIG);
    }
  }

}
