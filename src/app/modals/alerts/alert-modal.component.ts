import { Component, NgModule } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
@Component({
  selector: 'app-alert-modal',
  template: `
  <div class="modal-body text-center alert-{{type}}">
    {{content}}
  </div>




  `
})
export class AlertModalComponent {
  title!: string;
  content!: string;
  type!: string;
  constructor(public modalRef: BsModalRef) {}

  onClose() {
      this.modalRef.hide();
  }
}
