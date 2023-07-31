import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../modals/alerts/alert-modal.component';
import { AuthService } from "../service/auth.service";
import { UserEventCheckService } from "../service/user-event-check.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isLoggedOut: boolean = false; // 是否處於登出狀態

  constructor(private modalService: BsModalService,
              private http: HttpClient,
              private authService: AuthService,
              private userEventCheckService: UserEventCheckService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq).pipe(
        catchError((error) => {
          if (error.status === 401) {
            this.showAlertModal();
            // token過期，導回登入頁面
            this.isLoggedOut = true; // 設定為登出狀態
            this.userEventCheckService.stopUserEventCheck();
            this.authService.logout();
          }

          return throwError(error);
        })
      );
    } else {
      this.authService.logout();
      return next.handle(req);
    }



  }

  showAlertModal() {
    const modalRef: BsModalRef = this.modalService.show(AlertModalComponent, {
      class: 'modal-dialog-centered'
    });
    modalRef.content.content = "您的登入已逾時，請重新登入。"
    modalRef.content.type = "danger"
  }

  getIsLoggedOut(): boolean {
    return this.isLoggedOut;
  }
}
