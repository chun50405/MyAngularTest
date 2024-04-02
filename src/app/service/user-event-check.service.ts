import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class UserEventCheckService {
  private clickSubscription: Subscription | undefined;
  private keydownSubscription: Subscription | undefined;
  throttleTime: number = 10 * 60 * 1000;
  constructor(private authService: AuthService) { }



  startUserEventCheck() {
    this.clickSubscription = fromEvent(document, 'click').pipe(
      throttleTime(this.throttleTime) // 限制事件觸發頻率
    )
    .subscribe({
      next: () => {
        // console.log('clickSubscription')
        this.authService.refreshToken()
        .subscribe({
          next: (token) => {
            localStorage.setItem('token', token);
            console.log('更新token 成功', token)
          }
        })
      }
    })


    this.keydownSubscription = fromEvent(document, 'keydown').pipe(
      throttleTime(this.throttleTime) // 限制事件觸發頻率
    )
    .subscribe({
      next: () => {
         // console.log('keydownSubscription')
        this.authService.refreshToken()
        .subscribe({
          next: (token) => {
            localStorage.setItem('token', token);
            console.log('更新token 成功', token)
          }
        })
      }
    })

  }

  stopUserEventCheck() {
    if (this.clickSubscription) {
      this.clickSubscription.unsubscribe();
    }
    if (this.keydownSubscription) {
      this.keydownSubscription.unsubscribe();
    }
  }
}
