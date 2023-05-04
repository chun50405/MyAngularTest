import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../modals/alerts/alert-modal.component';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private modalService: BsModalService) {}

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
            this.router.navigate(['/login']);
          }

          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }



  }



  showAlertModal() {
    const modalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    modalRef.content.title = "Token過期"
    modalRef.content.content = "您的登入已逾時，請重新登入。"
  }
}
