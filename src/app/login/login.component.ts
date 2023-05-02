import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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


  constructor(private router: Router, private http: HttpClient) {}




  login(account:string, password:string) {

    let loginData = {
      account: account,
      password: password
    }

    this.http.post('/user/login', loginData)
    .pipe(
      map(response => {
        console.log('response=>', response);
      })
    )
    .subscribe(
      () => {
        console.log('Login success!');
        this.router.navigate(['/singleStockInfo']);
      },
      error => console.log('error =>', error)
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
