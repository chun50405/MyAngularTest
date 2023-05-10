import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }



  login(account:string, password:string) {

    let loginData = {
      account: account,
      password: password
    }

    return this.http.post('/user/login', loginData)
    .pipe(
      map((response:any) => {
        return response.theToken
      })
    )
  }

  register(formData:any) {
    let registerData = {
      account: formData.account_2,
      password: formData.password_2,
      email: formData.email
    }
    console.log('registerData=', registerData)
    return this.http.post('/user/register', registerData)
  }

  logout() {
    // 導航到目標頁面
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  refreshToken() {
    return this.http.get('/user/refreshToken')
      .pipe(
        map((response:any) => {
          return response.theToken
        })
      )
  }



}
