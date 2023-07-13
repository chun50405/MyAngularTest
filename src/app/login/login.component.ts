import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AuthService } from "../service/auth.service";
import { AlertModalComponent } from "../modals/alerts/alert-modal.component";
import { LoadingModalComponent } from "../modals/alerts/loading-modal.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  account!: string;
  password!: string;
  activeTab: string = 'login';
  loading: boolean = false;

  loadingModalRef?: BsModalRef;

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

  constructor(private router: Router, private authService: AuthService, private modalService: BsModalService) {}


  switchTab(tab: string) {
    this.activeTab = tab;
    //清除資料
    this.registerForm.reset();
    this.account = "";
    this.password = "";
  }

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
        console.log('error =>', error)
        this.isLoginFail = true
        if(error.error.message) {
          this.loginFailMessage = error.error.message
        }


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
      this.showLoadingModal();
      const formValue = this.registerForm.value;
      return this.authService.register(formValue)
      .subscribe((response) => {
        console.log('response=', response)
        this.hideLoadingModal();
        this.showSuccessModal();
        this.switchTab('login');
      },(error) => {
        this.hideLoadingModal();
        console.log('error=>', error)
      })

    } else {
      console.log('registerForm is invalid')
      return
    }

  }

  showSuccessModal() {
    const modalRef: BsModalRef = this.modalService.show(AlertModalComponent, {
      class: 'modal-dialog-centered'
    });
    modalRef.content.content = "註冊成功並且已發送認證信件至您的信箱，認證完後即可登入"
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

}
