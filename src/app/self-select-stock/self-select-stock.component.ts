import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
  // ...
} from '@angular/animations';

import * as moment from 'moment';
import { StockService } from "../service/stock.service";
@Component({
  selector: 'app-self-select-stock',
  templateUrl: './self-select-stock.component.html',
  styleUrls: ['./self-select-stock.component.css'],
  animations: [
    // animation triggers go here
    trigger('priceChange', [
      state('priceChange', style({
        opacity: 0,
      })),
      state('priceNotChange', style({
        opacity: 1,
      })),
      transition('priceChange <=> priceNotChange', [
        animate('2s'),
      ]),
    ])
  ]
})

export class SelfSelectStockComponent implements OnInit {
  title = 'MyAngularTest';
  tableParams: any[] = [];
  lastPriceList: any[] = [];
  theInterval: any;
  constructor(private http: HttpClient, private stockService: StockService) {


  }



   getStockInfo(stockList:any) {

     return this.stockService.getStockInfo(stockList);

  }

   getStockGroup(groupName?:string) {
    return this.stockService.getStockGroup(groupName);
  }


  async ngOnInit() {
    const groupStock:any = await this.getStockGroup();

    this.tableParams = await this.getStockInfo(groupStock);
    const marketOpenStart = moment().set({hour: 9, minute: 0, second: 0})
    const marketOpenEnd = moment().set({hour: 13, minute: 30, second: 0})
    const now = moment();

    if(now.isBetween(marketOpenStart, marketOpenEnd)) {
      this.theInterval = setInterval(async () => {
          this.tableParams =  await this.getStockInfo(groupStock);
          for(let idx in this.tableParams) {
            if(this.lastPriceList[idx] != this.tableParams[idx].price) {
              this.tableParams[idx].priceChange = true
              this.lastPriceList[idx] = this.tableParams[idx].price
            } else {
              this.tableParams[idx].priceChange = false
            }
          }
          // console.log('this.lastPriceList =>', this.lastPriceList)
          // console.log('this.tableParams =>', this.tableParams)

      }, 10000)

    } else {
      console.log('isNotOpenTime')
    }
  }

  ngOnDestroy() {
    clearInterval(this.theInterval);
  }
}
