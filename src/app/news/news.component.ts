import { Component, OnInit, TemplateRef } from '@angular/core';
import { StockService } from "../service/stock.service";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
// import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news:any
  newsModalRef?: BsModalRef;

  constructor(private stockService: StockService, private modalService: BsModalService) {}

  getStockNews() {
    return this.stockService.getStockNews()
    .subscribe((response) => {
      this.news = response
    })
  }

  openNewsModal(data:any) {
    const initialState: ModalOptions = {
      initialState: {
        data: data
      },
      class: 'modal-lg'
    };

    this.newsModalRef = this.modalService.show(NewsModalComponent, initialState);
  }

  ngOnInit() {
    this.getStockNews()
  }
}



//model
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'news-modal',
  template: `
      <div class="modal-header">
        <h4 class="modal-title pull-left">{{data.title}}</h4>
        <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
          <span aria-hidden="true" class="visually-hidden">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img src="{{data.image}}" alt="News Image" class="img-fluid">
         <div [innerHTML]="data.content | paragraph "></div>
      </div>
  `,
})

export class NewsModalComponent implements OnInit {
  data:any

  constructor(public bsModalRef: BsModalRef, private stockService: StockService) {}

  getNewsContent() {
    this.stockService.getStockNewsContent(this.data.url)
    .subscribe((theNewsContent) => {
       this.data.content = theNewsContent
    })
  }

  ngOnInit() {
    this.getNewsContent();
  }
}
