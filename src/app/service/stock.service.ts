import { Injectable } from '@angular/core';
import { Observable, interval, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {

  }



  async getStockInfo(stockList:any) {
    let result:any = []
    let list:any = []
    for(let row of stockList) {
      list.push(row.code)
    }

    let query = {
      ex_ch: list.join('|')
    }

    // console.log('query=', query)
    try {
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
          buyAmount: oneStock.g ? oneStock.g.split('_')[0]: '',
          sellAmount: oneStock.g ? oneStock.g.split('_')[0]: '',
          highestPrice: oneStock.h,
          lowestPrice: oneStock.l,
          openPrice: oneStock.o,
          yesterdayPrice: oneStock.y,
          time: oneStock.t,
          color: (oneStock.z - oneStock.y) > 0 ? 'danger' : 'success',
          highestColor: (oneStock.h - oneStock.o) >= 0 ? 'danger' : 'success',
          lowestColor: (oneStock.l - oneStock.o) >= 0 ? 'danger' : 'success',
          isUp: (oneStock.z - oneStock.y) > 0 ? true : false,
        }
        result.push(stockObj)
      }

      return result
    } catch (error) {
      console.error(error);
    }
  }

  async getStockGroup(groupName:string = '1') {
    const result:any = await this.http.get('/assets/groupStock.json').toPromise()
    // return result[groupName]
    return result[groupName]
  }



}
