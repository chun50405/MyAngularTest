import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyAngularTest';
  hideTopBar: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // console.log('event=', event)
        if (event.urlAfterRedirects === '/login') {
          this.hideTopBar = true;
        } else {
          this.hideTopBar = false;
        }
        // console.log('hideTopBar=', this.hideTopBar)
      }
    });
  }
}
