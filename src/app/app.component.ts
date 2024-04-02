import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserEventCheckService } from "./service/user-event-check.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyAngularTest';
  hideTopBar: boolean = false;





  constructor(private router: Router, private userEventCheckService: UserEventCheckService) {
    router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          // console.log('event=', event)
          if (event.urlAfterRedirects === '/login') {
            this.hideTopBar = true;
  
          } else {
            this.hideTopBar = false;
            this.userEventCheckService.startUserEventCheck();
          }
          // console.log('hideTopBar=', this.hideTopBar)
        }
      }
    })

  }





}
