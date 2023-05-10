import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Validators, FormControl, FormGroup } from '@angular/forms';
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
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    account_2: new FormControl('', [Validators.required]),
    password_2: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('',[Validators.required])
  })

  get email() {
    return this.registerForm.get('email');
  }

  get account_2() {
    return this.registerForm.get('account_2');
  }

  get password_2() {
    return this.registerForm.get('password_2');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

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
    const formValue = this.registerForm.value;
    if(formValue.password_2 !== formValue.confirmPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
    }
  }

  register() {

    if(this.registerForm.valid) {
      const formValue = this.registerForm.value;

      return this.authService.register(formValue)
      .subscribe((response) => {
        console.log('response=', response)

      },(error) => {
        console.log('error=>', error)
      })

    } else {
      console.log('registerForm is invalid')
      return
    }

  }


}
