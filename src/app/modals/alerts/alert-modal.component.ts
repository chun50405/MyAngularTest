import { Component, NgModule } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
@Component({
  selector: 'app-alert-modal',
  template: `
  <alert type="danger" [dismissible]="true" (onClose)="onClose()">
    {{content}}
  </alert>


  `
})
export class AlertModalComponent {
  title!: string;
  content!: string;
  constructor(public modalRef: BsModalRef) {}

  onClose() {
      this.modalRef.hide();
  }
}
