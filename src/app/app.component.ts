import { SideBarService } from './side-bar/side-bar.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front_end_angular';
  constructor(public SideBarService:SideBarService){

  }
  ngOnInit(): void {

  }
}
