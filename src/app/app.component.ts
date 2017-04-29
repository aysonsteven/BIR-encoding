import { Component } from '@angular/core';

@Component({
  selector: 'bir',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {

    document.addEventListener("deviceready", () => this.onDevinceReady(), false);
  }

  onDevinceReady() {
    console.log("yes, I am running in cordova.");
  }

}
