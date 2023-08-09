import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../service/auth.service";
@Component({
  selector: 'app-top-bar-menu',
  templateUrl: './top-bar-menu.component.html',
  styleUrls: ['./top-bar-menu.component.css']
})
export class TopBarMenuComponent implements OnInit{
  account!: string;

  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
  
  getUserData() {
    let thePayload:any = this.authService.getTokenPayload();
    if(thePayload) {
      let user = thePayload.user
      
      this.account = user.account
    }
  }

  ngOnInit() {
    this.getUserData();
  }
}
