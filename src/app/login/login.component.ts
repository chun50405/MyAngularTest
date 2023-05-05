import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from "../service/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  account!: string;
  password!: string;
  account_2!: string;
  password_2!: string;
  confirmPassword!: string;
  passwordMismatch: boolean = false;
  isLoginFail: boolean = false;

  defaultPage:string = 'singleStockInfo'

  constructor(private router: Router, private authService: AuthService) {}




  login(account:string, password:string) {

    return this.authService.login(account, password)
    .subscribe(
      (token) => {
        console.log('Login success!', token);
        // 將 Token 儲存在 LocalStorage 中
        localStorage.setItem('token', token);

        this.router.navigate([`/${this.defaultPage}`]);
      },
      (error) => {
        this.isLoginFail = true
        console.log('error =>', error)
      }
    )

  }


  checkPassword() {
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
    }
  }

  register(account: string, password:string, confirmPassword: string) {

  }


}
