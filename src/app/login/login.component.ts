import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { map, takeUntil, take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";

import { AuthService } from "../service/auth.service";
import { AlertModalComponent } from "../modals/alerts/alert-modal.component";
import { LoadingModalComponent } from "../modals/alerts/loading-modal.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  account!: string;
  password!: string;
  activeTab: string = 'login';
  loading: boolean = false;
  isReSendVerifiedMail: boolean = false
  currentUserMail!: string
  currentUserToken!: string

  loadingModalRef?: BsModalRef;
  onDestroy$ = new Subject<void>();
  socialUser?: SocialUser;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    account_2: new FormControl('', [Validators.required]),
    password_2: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]),
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
  loginFailMessage: string = "";
  defaultPage:string = 'singleStockInfo'

  constructor(private router: Router,
              private authService: AuthService,
              private modalService: BsModalService,
              private socialAuthService: SocialAuthService) {}


  switchTab(tab: string) {
    this.activeTab = tab;
    //清除資料
    this.registerForm.reset();
    this.account = "";
    this.password = "";
  }

  login(account:string, password:string) {

    return this.authService.login(account, password)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (token) => {
        console.log('Login success!', token);
        // 將 Token 儲存在 LocalStorage 中
        localStorage.setItem('token', token);

        this.router.navigate([`/${this.defaultPage}`]);
      },
      error: (error) => {
        console.error('error =>', error);

        this.isLoginFail = true;
        if (error.error.message) {
          this.loginFailMessage = error.error.message;
          if (error.error.isVerified == false) {
            this.isReSendVerifiedMail = true;
            this.currentUserMail = error.error.email;
            this.currentUserToken = error.error.token;
          }
        }
        // 在這裡處理錯誤
      }
    });

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
      this.showLoadingModal();
      const formValue = this.registerForm.value;
      this.authService.register(formValue)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (response) => {
            console.log('response=', response);
            this.hideLoadingModal();
            this.showSuccessModal('註冊成功並且已發送認證信件至您的信箱，認證完後即可登入');
            this.switchTab('login');
          },
          error: (error) => {
            this.hideLoadingModal();
            console.error('error=>', error);
          }
        });
    } else {
      console.log('registerForm is invalid');
      return;
    }
  }

  reSendVerifiedMail() {
    return this.authService.reSendVerifiedMail(this.currentUserToken, this.account, this.currentUserMail)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (response) => {
          console.log('response=>', response);
          this.isReSendVerifiedMail = false;
          this.showSuccessModal("重新發送認證信件至您的信箱，認證完後即可登入");
        },
        error: (error) => {
          console.error('error=>', error);
        }
      });
  }

  showSuccessModal(content:string) {
    const modalRef: BsModalRef = this.modalService.show(AlertModalComponent, {
      class: 'modal-dialog-centered'
    });
    modalRef.content.content = content
    modalRef.content.type = "success"
  }

  showLoadingModal() {
    this.loadingModalRef = this.modalService.show(LoadingModalComponent, {
      ignoreBackdropClick: true
    });
  }

  hideLoadingModal() {
    this.loadingModalRef?.hide()
  }



  ngOnInit() {
    this.socialAuthService.authState
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          console.log("socialAuthService user=", user);
          this.socialUser = user;
          if (user) {
            this.authService.loginByGoogle(user)
              .pipe(takeUntil(this.onDestroy$))
              .subscribe({
                next: (token) => {
                  console.log('Login success!', token);
                  // 將 Token 儲存在 LocalStorage 中
                  localStorage.setItem('token', token);
  
                  this.router.navigate([`/${this.defaultPage}`]);
                },
                error: (error) => {
                  console.log('error =>', error);
                  this.isLoginFail = true;
                  if (error.error.message) {
                    this.loginFailMessage = error.error.message;
                  }
                }
              });
          } else {
            return;
          }
        }
      });
  }

  ngOnDestroy() { //when login page is being destroyed (moving to other page), signOut from google
    if(this.socialUser) {
      this.socialAuthService.signOut();
    }
    //取消所有訂閱
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
