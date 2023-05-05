import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../service/auth.service";
@Component({
  selector: 'app-top-bar-menu',
  templateUrl: './top-bar-menu.component.html',
  styleUrls: ['./top-bar-menu.component.css']
})
export class TopBarMenuComponent {


  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
