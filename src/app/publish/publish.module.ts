import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ManageComponent } from './manage/manage.component';
import { ShareModule } from '../share/share.module';



@NgModule({
  declarations: [
    HomeComponent,
    ManageComponent
  ],
  imports: [
    ShareModule
  ]
})
export class PublishModule { }
