import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  constructor() {
    document.addEventListener("deviceready", () => this.onDevinceReady(), false);
  }

  onDevinceReady() {
    console.log("yes, I am running in cordova.");
  }

}
