import { NewsService } from './../news.service';
import { SideBarService } from './../../side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';
import { READ_SIDE_BAR_CONFIG } from '../side-bar-config';
import { News } from 'src/app/model/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsArray:News[] = [];

  constructor(private SideBarService:SideBarService,
    private NewsService:NewsService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(READ_SIDE_BAR_CONFIG);
    this.NewsService.getNews().subscribe(
      res => this.newsArray = res
    )
  }

}
