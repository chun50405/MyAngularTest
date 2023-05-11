import { Component, NgModule } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
@Component({
  selector: 'app-alert-modal',
  template: `
  <div class="modal-body text-center alert-dark">
    <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p>Loading...</p>
  </div>




  `
})
export class LoadingModalComponent {


  constructor(public modalRef: BsModalRef) {}

  onClose() {
      this.modalRef.hide();
  }
}
