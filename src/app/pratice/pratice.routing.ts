import { SettingComponent } from './setting/setting.component';

import { Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { MyselfComponent } from './myself/myself.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'myself', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'myself', component: MyselfComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'setting', component: SettingComponent },
];

export const PraticeRouter = routes;
