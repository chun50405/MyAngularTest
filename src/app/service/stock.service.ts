import { Injectable } from '@angular/core';
import { Observable, interval, of, forkJoin, map, catchError   } from "rxjs";
import { concatMap, debounceTime  } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as moment from 'moment';
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
    const result:any = await this.http.get('/stock/getStockGroup').toPromise()
    // return result[groupName]
    return result[groupName]
  }

  async addStockToStockGroup(addData:any, groupName:string = '1') {
    const theStockGroup:any = await this.getStockGroup();
    theStockGroup.push(addData)
    await this.http.put('/stock/editStockGroup', {jsonData: theStockGroup, groupName: groupName}).toPromise();
  }

  async checkStockIsInGroup(stockNo:string) {
    const theStockGroup:any = await this.getStockGroup();

    let isInGroup = theStockGroup.some((item:any) => {
      return item.code == `tse_${stockNo}.tw`;
    })
    return isInGroup;
  }

   // const observables = months.map(month => this.fetchData(year, month));
  //先直接查一年內 因為現在此API似乎只能一次查一個月(查詢多次 1~12月)
  getStockDayHistory(code: string):Observable<any> {
    let observables = []
    let query:any = {
      response: 'json',
      date: moment().set({date: 1}),
      stockNo: code
    }

    for(let i = 0 ; i <= 6 ; i++) {
      query.date = moment().set({date: 1}).subtract(i, 'month').format('YYYYMMDD');
      const observable = this.http.get<any>('/exchangeReport/STOCK_DAY', {params: query})
      observables.push(observable)
    }

    return forkJoin(observables).pipe(
      map(results => {
        let combinedData:any = {
          title: null,
          data: []
        };

        for(let result of results) {

          if(!combinedData.title) {
            combinedData.title = result.title.split(" ")[2];
          }
          // console.log('result=', result.data)
          if(result.data) {
            for(let row of result.data) {
              const [year, month, day] = row[0].split("/").map(Number);
              const timestamp = new Date(1911 + year, month - 1, day).getTime();
              let obj = {
                date: timestamp,
                price: Number(row[6])
              }
              combinedData.data.push(obj);
            }
          }

        }

        // console.log('combinedData=', combinedData)
        combinedData.data.sort((a:any, b:any) => a.date - b.date);
        return combinedData;
      }),
      catchError(error => {
        console.log('Error fetching stock data:', error);
        return of([]);
      })
    );
  }


  getFakeStockDayHistory(code: string):Observable<any> {
    const data = [
      {date: '2023/04/01', price: 500},
      {date: '2023/04/02', price: 501},
      {date: '2023/04/03', price: 502},
      {date: '2023/04/04', price: 503},
      {date: '2023/04/05', price: 504},
      {date: '2023/04/06', price: 505},
      {date: '2023/04/07', price: 506},
      {date: '2023/04/08', price: 507},
      {date: '2023/04/09', price: 508},
      {date: '2023/04/10', price: 509},
      {date: '2023/04/12', price: 510},
      {date: '2023/04/13', price: 512},
      {date: '2023/04/14', price: 515},
      {date: '2023/04/15', price: 520},
      {date: '2023/04/16', price: 522},
      {date: '2023/04/17', price: 523},
      {date: '2023/04/18', price: 528},
      {date: '2023/04/19', price: 533},
      {date: '2023/04/20', price: 535},
      {date: '2023/04/21', price: 530}
    ]
    return of(data)
  }


  getStockCompanyInfo(code: string):Observable<any> {

    return this.http.get<any>('/v1/opendata/t187ap03_L')
    .pipe(
      map(response => {

        let result = response.filter((data:any) => {
          return data['公司代號'] == code
        })

        return result[0]
      })
    )

  }


  getStockNames(searchCode: string):Observable<string[]> {

    return this.http.get<any>('/rwd/zh/api/codeQuery', {params: {query: searchCode}})
    .pipe(
      map(response => {
        return response['suggestions']
      })
    )

  }


}
