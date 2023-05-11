import { Component, NgModule, OnInit } from '@angular/core';
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
export class AlertModalComponent implements OnInit {
  title!: string;
  content!: string;
  type!: string;
  constructor(public modalRef: BsModalRef) {}

  onClose() {
      this.modalRef.hide();
  }

  ngOnInit() {
    setTimeout(() => {
      this.modalRef.hide();
    }, 5000);
  }
}
