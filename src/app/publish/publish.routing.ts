import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'edit', component: HomeComponent },
];

export const publishRouter = routes;
