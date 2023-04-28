import { Component, OnInit } from '@angular/core';
import { StockService } from "../service/stock.service";
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, Observer, interval, of, map } from "rxjs";
import { concatMap, switchMap, debounceTime, distinctUntilChanged  } from 'rxjs/operators';
import { Chart, StockChart } from 'angular-highcharts';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';



import HC_exporting from 'highcharts/modules/exporting'; //呈現匯出按鈕用



@Component({
  selector: 'app-single-stock-info',
  templateUrl: './single-stock-info.component.html',
  styleUrls: ['./single-stock-info.component.css']
})
export class SingleStockInfoComponent implements OnInit {
  code:string = "";
  stockCompanyInfo:any;
  chart:any;
  isInGroup:boolean = false;


  suggestions$?: Observable<string[]>;




  constructor(private http: HttpClient, private stockService: StockService) {

    HC_exporting(Highcharts);


  }

  getStockNames(searchCode: string){
    this.stockService.getStockNames(searchCode)

  }


  search() {

    this.stockService.getStockDayHistory(this.code).subscribe(data => {
     console.log(data);
     // 在這裡處理獲得的資料，例如顯示在畫面上

     this.chart = new StockChart({
     rangeSelector: {
          selected: 1
      },
     chart: {
       type: 'line',
       renderTo: 'highCharts'
       // zoomType: 'x'
     },
     title: {
       text: data.title
     },
     subtitle: {
       text: '走勢圖'
     },
     xAxis: {
       type: 'datetime',
       title: {
         text: '日期'
       }
     },
     yAxis: {
       title: {
         text: '價格'
       }
     },
     legend: {
       enabled: true
     },
     credits: {
       enabled: true
     },
     data: {
       // dateFormat: 'YYYY/mm/dd'
     },
     series: [{
       name: data.title,
       type: 'area',
       data: data.data.map((d:any) => {
         return [d.date, d.price];
       })
     }],
     accessibility: {
      enabled: false
    }
   });

   });

    this.stockService.getStockCompanyInfo(this.code).subscribe(async data => {
      console.log('getStockCompanyInfo data=>', data)
      this.stockCompanyInfo = data;
      this.isInGroup = await this.stockService.checkStockIsInGroup(this.code);
    });
  }


  addIntoSelfSelect(code:string) {
    let addData = {
      code: `tse_${code}.tw`
    }
    this.stockService.addStockToStockGroup(addData);
    console.log('更新成功')
  }


  getStockSuggestion() {
    this.suggestions$ = new Observable((observer: Observer<string | undefined>) => {
      observer.next(this.code);
    }).pipe(
      switchMap((code: string) => {
        if (code) {
          return this.stockService.getStockNames(code)
          .pipe(
            map((data: any) => data || [])
          )
        }

        return of([]);
      })
    );
  }

  onSelect(event:any): void {
    let value = event.item.split('\t')[0]
    this.code = value
  }

  ngOnInit() {
    this.getStockSuggestion();

  }

}
