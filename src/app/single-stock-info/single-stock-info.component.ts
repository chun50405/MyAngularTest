import { Component } from '@angular/core';
import { StockService } from "../service/stock.service";
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, interval, of } from "rxjs";
import { Chart, StockChart } from 'angular-highcharts';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';

import HC_exporting from 'highcharts/modules/exporting'; //呈現匯出按鈕用



@Component({
  selector: 'app-single-stock-info',
  templateUrl: './single-stock-info.component.html',
  styleUrls: ['./single-stock-info.component.css']
})
export class SingleStockInfoComponent {
  code:string = "";

  info:any;

  stockCompanyInfo:any;


  chart:any;




  constructor(private http: HttpClient, private stockService: StockService) {

    HC_exporting(Highcharts);

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
     }]
   });

   });

    this.stockService.getStockCompanyInfo(this.code).subscribe(data => {
      console.log('getStockCompanyInfo data=>', data)
      this.stockCompanyInfo = data
    });
  }



}
