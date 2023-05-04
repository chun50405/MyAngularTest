import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-bar-menu',
  templateUrl: './top-bar-menu.component.html',
  styleUrls: ['./top-bar-menu.component.css']
})
export class TopBarMenuComponent {


  constructor(private router: Router) {}

  logout() {
    // 導航到目標頁面
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
