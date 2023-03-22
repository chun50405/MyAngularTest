import { Component } from '@angular/core';
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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent {
  title = 'MyAngularTest';
  tableParams: any[] = [];
  lastPriceList: any[] = [];
  theInterval: any;
  constructor(private http: HttpClient) {
    this.getStockInfo();


    this.theInterval = setInterval(async () => {
      await this.getStockInfo();;
      for(let idx in this.tableParams) {
        if(this.lastPriceList[idx] != this.tableParams[idx].price) {
          this.tableParams[idx].priceChange = true
          this.lastPriceList[idx] = this.tableParams[idx].price
        } else {
          this.tableParams[idx].priceChange = false
        }
      }
      console.log('this.lastPriceList =>', this.lastPriceList)
      console.log('this.tableParams =>', this.tableParams)
    }, 10000)
  }



  async getStockInfo(stockList = ['tse_2330.tw', 'tse_0050.tw', 'tse_2357.tw']) {
    let result:any = []



    let query = {
      ex_ch: stockList.join('|')
    }

    console.log('query=', query)

    let response:any = await this.http.get('/stock/api/getStockInfo.jsp', { params: query})
    .toPromise();

    for(let oneStock of response.msgArray) {
      //因為證交所API的當下成交價格有可能為空的 所以就拿委賣(委買也可以)的第一筆當作成交價格
      //可能會有些不準確 但也沒辦法
      if(oneStock.z == '-') {
        oneStock.z = oneStock.a.split('_')[0]
      }
      let stockObj = {
        name: oneStock.n,
        code: oneStock.c,
        price: oneStock.z,
        upAndDown: Math.abs(oneStock.z - oneStock.y),
        range: (Math.abs(oneStock.z - oneStock.y) / oneStock.y),
        singleAmount: oneStock.ps,
        totalAmount: oneStock.v,
        buyAmount: oneStock.g.split('_')[0],
        sellAmount: oneStock.g.split('_')[0],
        highestPrice: oneStock.h,
        lowestPrice: oneStock.l,
        openPrice: oneStock.o,
        yesterdayPrice: oneStock.y,
        time: oneStock.t,
        color: (oneStock.z - oneStock.y) > 0 ? 'danger' : 'success',
        highestColor: (oneStock.h - oneStock.o) >= 0 ? 'danger' : 'success',
        lowestColor: (oneStock.l - oneStock.o) >= 0 ? 'danger' : 'success',
      }
      result.push(stockObj)
    }

    this.tableParams = result

  }




}
