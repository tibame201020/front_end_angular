
import { Routes } from "@angular/router";
import { AllComponent } from "./all/all.component";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { NewsComponent } from "./news/news.component";
import { StockInfoComponent } from "./stock-info/stock-info.component";

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: AllComponent },
  { path: 'news', component: NewsComponent },
  { path: 'stock', component: StockInfoComponent },
  { path: 'article_detail', component: ArticleDetailComponent },
];

export const ReadRouter = routes;
